'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { ExportButton } from '@/components/ExportButton';
import { formatDate } from '@/lib/utils';
import { Printer, Search, X } from 'lucide-react';
import { FormInput } from '@/components/FormInput';
import { toast } from 'react-hot-toast';
import { api } from '@/lib/api';

interface Asset {
  id: string;
  serialNumber: string;
  clientName: string;
  productName?: string;
  model?: {
    name: string;
  };
  createdAt: string;
}

interface Complaint {
  id: string;
  callId: string;
  callDate: string;
  doneDate?: string;
  details?: string;
  loggedBy?: string;
  clientFeedback?: string;
  callDone: boolean;
}

export default function AssetDetailsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchSerial, setSearchSerial] = useState('');
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loadingComplaints, setLoadingComplaints] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    filterAssets();
  }, [searchSerial, assets]);

  const fetchAssets = async () => {
    try {
      const data = await api.get<any[]>('/assets');
      const assetsWithProductName = data.map((asset: any) => ({
        ...asset,
        productName: asset.modelName || asset.model?.name || 'Unknown Product',
        clientName: asset.clientName || 'Your Company',
      }));
      setAssets(assetsWithProductName);
      setFilteredAssets(assetsWithProductName);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAssets = () => {
    if (!searchSerial) {
      setFilteredAssets(assets);
    } else {
      const filtered = assets.filter(asset =>
        asset.serialNumber.toLowerCase().includes(searchSerial.toLowerCase())
      );
      setFilteredAssets(filtered);
    }
  };

  const fetchComplaintDetails = async (serialNumber: string) => {
    setLoadingComplaints(true);
    try {
      const data = await api.get<Complaint[]>(`/complaints?serialNumber=${serialNumber}`);
      // flatten call logs from complaints
      const logs = (data as any[]).flatMap((c: any) =>
        (c.callLogs ?? []).map((log: any) => ({
          id: log.id,
          callId: `CL-${log.id.slice(0, 8)}`,
          callDate: log.callDate,
          doneDate: log.doneDate,
          details: log.details || c.description,
          loggedBy: log.loggedBy || 'System',
          clientFeedback: log.clientFeedback,
          callDone: log.callDone,
        }))
      );
      setComplaints(logs);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setComplaints([]);
    } finally {
      setLoadingComplaints(false);
    }
  };

  const handleSerialClick = async (asset: Asset) => {
    setSelectedAsset(asset);
    await fetchComplaintDetails(asset.serialNumber);
  };

  const columns = [
    { 
      key: 'serialNumber', 
      label: 'Serial Number',
      render: (asset: Asset) => (
        <button
          onClick={() => handleSerialClick(asset)}
          className="text-primary hover:text-blue-700 underline font-medium"
        >
          {asset.serialNumber}
        </button>
      )
    },
    { key: 'clientName', label: 'Client Name' },
    { key: 'productName', label: 'Product Name' },
    {
      key: 'model.name',
      label: 'Model',
      render: (asset: Asset) => asset.model?.name || '-',
    },
    {
      key: 'createdAt',
      label: 'Registration Date',
      render: (asset: Asset) => formatDate(asset.createdAt),
    },
  ];

  const complaintColumns = [
    { key: 'sr', label: 'SR', render: (_: any, index: number) => index + 1 },
    { key: 'callId', label: 'CALL ID' },
    { 
      key: 'callDate', 
      label: 'CALL DATE',
      render: (complaint: Complaint) => formatDate(complaint.callDate)
    },
    { 
      key: 'doneDate', 
      label: 'DONE DATE',
      render: (complaint: Complaint) => complaint.doneDate ? formatDate(complaint.doneDate) : '-'
    },
    { key: 'details', label: 'CALL DETAILS', render: (complaint: Complaint) => complaint.details || '-' },
    { key: 'loggedBy', label: 'CALL LOGGED BY', render: (complaint: Complaint) => complaint.loggedBy || '-' },
    { key: 'clientFeedback', label: 'CLIENT FEEDBACK', render: (complaint: Complaint) => complaint.clientFeedback || '-' },
    { 
      key: 'callDone', 
      label: 'CALL DONE',
      render: (complaint: Complaint) => (
        <span className={`px-2 py-1 rounded text-xs ${
          complaint.callDone 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {complaint.callDone ? 'Yes' : 'No'}
        </span>
      )
    },
  ];

  const exportData = filteredAssets.map((asset) => ({
    'Serial Number': asset.serialNumber,
    'Client Name': asset.clientName,
    'Product Name': asset.productName || '-',
    Model: asset.model?.name || '-',
    'Registration Date': formatDate(asset.createdAt),
  }));

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Printer className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Asset Details</h1>
          </div>
          <ExportButton data={exportData} fileName="assets" />
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Serial Number..."
                value={searchSerial}
                onChange={(e) => setSearchSerial(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Click on Serial Number to view complaint history and details
        </p>

        <DataTable data={filteredAssets} columns={columns} />
      </div>

      <Modal
        isOpen={!!selectedAsset}
        onClose={() => {
          setSelectedAsset(null);
          setComplaints([]);
        }}
        title="Asset & Complaint Details"
        size="xl"
      >
        {selectedAsset && (
          <div className="space-y-6">
            {/* Asset Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Asset Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Client Name</p>
                  <p className="font-medium">{selectedAsset.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Product Name</p>
                  <p className="font-medium">{selectedAsset.productName || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Serial Number</p>
                  <p className="font-medium">{selectedAsset.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Model</p>
                  <p className="font-medium">{selectedAsset.model?.name || '-'}</p>
                </div>
              </div>
            </div>

            {/* Complaints History */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Previous Complaints Detail</h3>
              {loadingComplaints ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : complaints.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {complaintColumns.map((column) => (
                          <th
                            key={column.key}
                            className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700"
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((complaint, index) => (
                        <tr key={complaint.id} className="hover:bg-gray-50">
                          {complaintColumns.map((column) => (
                            <td
                              key={column.key}
                              className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                            >
                              {column.render ? column.render(complaint, index) : (complaint as any)[column.key] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No past complaint found for this product</p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedAsset(null);
                  setComplaints([]);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Close this page
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}