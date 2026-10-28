'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { ExportButton } from '@/components/ExportButton';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Eye, Calendar, Filter, X } from 'lucide-react';
import { api } from '@/lib/api';

interface Order {
  id: string;
  orderDate: string;
  productName: string;
  serialNumber: string;
  quantity: number;
  status: string;
  trackingNumber?: string;
  contactPerson: string;
  contactNumber: string;
  state?: string;
  poNumber?: string;
  comments?: string;
  type?: string;
  modelNumber?: string;
  city?: { name: string };
  location?: { name: string };
}

export default function OrderStatusPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: '',
  });
  const [activeFilters, setActiveFilters] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, activeFilters]);

  const fetchOrders = async () => {
    try {
      const data = await api.get<Order[]>('/orders');
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Apply date filters
    if (activeFilters.startDate) {
      const startDate = new Date(activeFilters.startDate);
      startDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate;
      });
    }

    if (activeFilters.endDate) {
      const endDate = new Date(activeFilters.endDate);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate <= endDate;
      });
    }

    setFilteredOrders(filtered);
  };

  const handleApplyFilter = () => {
    setActiveFilters({
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
    });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setDateFilter({
      startDate: '',
      endDate: '',
    });
    setActiveFilters({
      startDate: '',
      endDate: '',
    });
    setFilteredOrders(orders);
  };

  const hasActiveFilters = activeFilters.startDate || activeFilters.endDate;

  // Get today's date in YYYY-MM-DD format for max date
  const today = new Date().toISOString().split('T')[0];

  const columns = [
    {
      key: 'orderDate',
      label: 'Order Date',
      render: (order: Order) => formatDate(order.orderDate),
    },
    { key: 'productName', label: 'Product Name' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'quantity', label: 'Quantity' },
    {
      key: 'city',
      label: 'City',
      render: (order: Order) => order.city?.name || order.state || '-',
    },
    {
      key: 'status',
      label: 'Status',
      render: (order: Order) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      ),
    },
    { 
      key: 'trackingNumber', 
      label: 'Tracking Number',
      render: (order: Order) => order.trackingNumber || '-'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (order: Order) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOrder(order);
          }}
          className="text-primary hover:text-blue-700"
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
    },
  ];

  const exportData = filteredOrders.map((order) => ({
    'Order Date': formatDate(order.orderDate),
    'Product Name': order.productName,
    'Serial Number': order.serialNumber,
    'Type': order.type || '-',
    'Model Number': order.modelNumber || '-',
    Quantity: order.quantity,
    Status: order.status,
    'Tracking Number': order.trackingNumber || '-',
    'Contact Person': order.contactPerson,
    'Contact Number': order.contactNumber,
    State: order.state || '-',
    City: order.city?.name || '-',
    Location: order.location?.name || '-',
    'PO Number': order.poNumber || '-',
    Comments: order.comments || '-',
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
          <h1 className="text-2xl font-bold">Order Status</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                hasActiveFilters 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="bg-white text-primary px-2 py-0.5 rounded-full text-xs">
                  Active
                </span>
              )}
            </button>
            <ExportButton data={exportData} fileName={`orders_${new Date().toISOString().split('T')[0]}`} />
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Filter Orders</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  From Date
                </label>
                <input
                  type="date"
                  value={dateFilter.startDate}
                  onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                  max={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  To Date
                </label>
                <input
                  type="date"
                  value={dateFilter.endDate}
                  onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                  min={dateFilter.startDate}
                  max={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={handleApplyFilter}
                  disabled={!dateFilter.startDate && !dateFilter.endDate}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Apply Filter
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 text-sm text-gray-600">
                Showing orders from {activeFilters.startDate ? formatDate(activeFilters.startDate) : 'beginning'} to {activeFilters.endDate ? formatDate(activeFilters.endDate) : 'today'}
              </div>
            )}
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-primary">{filteredOrders.length}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredOrders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Processing</p>
            <p className="text-2xl font-bold text-blue-600">
              {filteredOrders.filter(o => o.status === 'processing').length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredOrders.filter(o => o.status === 'completed').length}
            </p>
          </div>
        </div>

        <DataTable 
          data={filteredOrders} 
          columns={columns}
          onRowClick={(order) => setSelectedOrder(order)}
        />
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Order Details"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Product Name</p>
                <p className="font-medium">{selectedOrder.productName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Serial Number</p>
                <p className="font-medium">{selectedOrder.serialNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium">{selectedOrder.type || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Model Number</p>
                <p className="font-medium">{selectedOrder.modelNumber || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Quantity</p>
                <p className="font-medium">{selectedOrder.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="font-medium">{selectedOrder.trackingNumber || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="font-medium">{selectedOrder.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <p className="font-medium">{selectedOrder.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="font-medium">{selectedOrder.state || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-medium">{selectedOrder.city?.name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{selectedOrder.location?.name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PO Number</p>
                <p className="font-medium">{selectedOrder.poNumber || '-'}</p>
              </div>
            </div>
            {selectedOrder.comments && (
              <div>
                <p className="text-sm text-gray-600">Comments</p>
                <p className="font-medium">{selectedOrder.comments}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}