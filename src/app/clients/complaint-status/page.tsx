'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { ExportButton } from '@/components/ExportButton';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Eye, MessageSquare } from 'lucide-react';
import { api } from '@/lib/api';

interface Complaint {
  id: string;
  createdAt: string;
  state: string;
  contactPerson: string;
  contactNumber: string;
  productName: string;
  serialNumber: string;
  problemType: string;
  comments?: string;
  status: string;
  branch?: {
    name: string;
    city?: { name: string };
  };
  callLogs?: Array<{
    id: string;
    callDate: string;
    details?: string;
    loggedBy?: string;
    clientFeedback?: string;
    callDone: boolean;
  }>;
}

export default function ComplaintStatusPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await api.get<Complaint[]>('/complaints');
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'createdAt',
      label: 'Date',
      render: (complaint: Complaint) => formatDate(complaint.createdAt),
    },
    { key: 'productName', label: 'Product' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'problemType', label: 'Problem Type' },
    {
      key: 'status',
      label: 'Status',
      render: (complaint: Complaint) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
          {complaint.status}
        </span>
      ),
    },
    {
      key: 'branch.name',
      label: 'Branch',
      render: (complaint: Complaint) => complaint.branch?.name || '-',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (complaint: Complaint) => (
        <button
          onClick={() => setSelectedComplaint(complaint)}
          className="text-primary hover:text-blue-700"
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
    },
  ];

  const exportData = complaints.map((complaint) => ({
    Date: formatDate(complaint.createdAt),
    Product: complaint.productName,
    'Serial Number': complaint.serialNumber,
    'Problem Type': complaint.problemType,
    Status: complaint.status,
    Branch: complaint.branch?.name || '-',
    'Contact Person': complaint.contactPerson,
    'Contact Number': complaint.contactNumber,
    Comments: complaint.comments || '-',
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
          <h1 className="text-2xl font-bold">Complaint Status</h1>
          <ExportButton data={exportData} fileName="complaints" />
        </div>

        <DataTable data={complaints} columns={columns} />
      </div>

      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title="Complaint Details"
        size="xl"
      >
        {selectedComplaint && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Complaint Date</p>
                <p className="font-medium">{formatDate(selectedComplaint.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                  {selectedComplaint.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Product Name</p>
                <p className="font-medium">{selectedComplaint.productName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Serial Number</p>
                <p className="font-medium">{selectedComplaint.serialNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Problem Type</p>
                <p className="font-medium">{selectedComplaint.problemType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Branch</p>
                <p className="font-medium">{selectedComplaint.branch?.name || '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Problem Description</p>
                <p className="font-medium">{selectedComplaint.comments || 'No description provided'}</p>
              </div>
            </div>

            {selectedComplaint.callLogs && selectedComplaint.callLogs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Call Logs
                </h3>
                <div className="space-y-3">
                  {selectedComplaint.callLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-600">{formatDate(log.callDate)}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${log.callDone ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {log.callDone ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm">{log.details || 'No details'}</p>
                      {log.clientFeedback && (
                        <p className="text-sm mt-2 text-gray-600">
                          <strong>Feedback:</strong> {log.clientFeedback}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}