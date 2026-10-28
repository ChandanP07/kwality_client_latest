'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { ExportButton } from '@/components/ExportButton';
import { SelectBox } from '@/components/SelectBox';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Download, DollarSign } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api, publicGet } from '@/lib/api';

interface Bill {
  id: string;
  billDate: string;
  invoiceNo: string;
  amount: number;
  overdue: boolean;
  paid: boolean;
  attachment?: string;
  city?: { id: number; name: string };
  location?: { id: string; name: string };
}

interface City {
  id: number;
  name: string;
}

const BANK_DETAILS = {
  accountHolder: 'Kwality Enterprise',
  bankName: 'State Bank of India',
  accountType: 'Current Account',
  ifsc: 'SBIN0001234',
  accountNumber: '1234567890',
  branch: 'Mumbai Main Branch',
  gstNo: 'GST123456789',
  panNumber: 'ABCDE1234F',
  corporateId: 'CIN123456789',
  msmeNumber: 'MSME123456',
};

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBills, setSelectedBills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
    fetchCities();
  }, []);

  useEffect(() => {
    filterBills();
  }, [selectedCity, bills]);

  const fetchBills = async () => {
    try {
      const data = await api.get<Bill[]>('/bills');
      setBills(data);
      setFilteredBills(data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const data = await publicGet<City[]>('/cities');
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const filterBills = () => {
    if (!selectedCity || selectedCity === 'all') {
      setFilteredBills(bills);
    } else {
      const filtered = bills.filter(
        bill => bill.city?.id.toString() === selectedCity
      );
      setFilteredBills(filtered);
    }
  };

  const handleSelectBill = (billId: string) => {
    setSelectedBills(prev =>
      prev.includes(billId)
        ? prev.filter(id => id !== billId)
        : [...prev, billId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBills.length === filteredBills.length) {
      setSelectedBills([]);
    } else {
      setSelectedBills(filteredBills.map(bill => bill.id));
    }
  };

  const calculateTotal = () => {
    return filteredBills
      .filter(bill => selectedBills.includes(bill.id))
      .reduce((sum, bill) => sum + bill.amount, 0);
  };

  const handlePayNow = () => {
    if (selectedBills.length === 0) {
      toast.error('Please select bills to pay');
      return;
    }
    toast.success(`Redirecting to payment gateway for ${formatCurrency(calculateTotal())}`);
    // Implement payment gateway integration here
  };

  const columns = [
    { 
      key: 'sr', 
      label: 'SR', 
      render: (_: any, index: number) => index + 1 
    },
    {
      key: 'billDate',
      label: 'Bill Date',
      render: (bill: Bill) => formatDate(bill.billDate),
    },
    { key: 'invoiceNo', label: 'Bill' },
    {
      key: 'attachment',
      label: 'Attachment',
      render: (bill: Bill) => (
        <button
          className="text-primary hover:text-blue-700"
          title="Download Invoice"
        >
          <Download className="h-4 w-4" />
        </button>
      ),
    },
    {
      key: 'city.name',
      label: 'City',
      render: (bill: Bill) => bill.city?.name || '-',
    },
    {
      key: 'location.name',
      label: 'Location',
      render: (bill: Bill) => bill.location?.name || '-',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (bill: Bill) => formatCurrency(bill.amount),
    },
    {
      key: 'overdue',
      label: 'Overdue',
      render: (bill: Bill) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          bill.overdue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {bill.overdue ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedBills.length === filteredBills.length && filteredBills.length > 0}
          onChange={handleSelectAll}
          className="rounded border-gray-300"
        />
      ),
      render: (bill: Bill) => (
        <input
          type="checkbox"
          checked={selectedBills.includes(bill.id)}
          onChange={() => handleSelectBill(bill.id)}
          className="rounded border-gray-300"
        />
      ),
    },
  ];

  const exportData = filteredBills.map((bill, index) => ({
    SR: index + 1,
    'Bill Date': formatDate(bill.billDate),
    'Invoice No': bill.invoiceNo,
    City: bill.city?.name || '-',
    Location: bill.location?.name || '-',
    Amount: bill.amount,
    Overdue: bill.overdue ? 'Yes' : 'No',
    Status: bill.paid ? 'Paid' : 'Unpaid',
  }));

  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    ...cities.map(city => ({ value: city.id.toString(), label: city.name }))
  ];

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
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Bill Details</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="w-48">
            <SelectBox
              label=""
              options={cityOptions}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            />
          </div>
          <ExportButton data={exportData} fileName="bills" />
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            Select bills and click on PayNow to make online payment
          </p>
        </div>

        <DataTable 
          data={filteredBills} 
          columns={columns}
          pageSize={10}
        />

        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total: {formatCurrency(calculateTotal())}
          </div>
          <button
            onClick={handlePayNow}
            disabled={selectedBills.length === 0}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Bank Details Card */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Bank Details for Payment</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">Account Holder Name</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.accountHolder}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">Bank Name</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.bankName}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">Account Type</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.accountType}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">RTGS/NEFT IFSC</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.ifsc}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">Account Number</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.accountNumber}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">Branch</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.branch}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">GST NO</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.gstNo}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">PAN Number</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.panNumber}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">Corporate Identity Number</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.corporateId}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">MSME Number</td>
                <td className="border border-gray-300 px-4 py-2">{BANK_DETAILS.msmeNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}