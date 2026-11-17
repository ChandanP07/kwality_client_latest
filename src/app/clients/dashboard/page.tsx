'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  AlertCircle,
  DollarSign,
  Printer,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,  // Add this import
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/api';
import { formatDate, getStatusColor } from '@/lib/utils';

interface Stats {
  orders: { total: number; pending: number; completed: number };
  complaints: { total: number; open: number; resolved: number };
  bills: { total: number; paid: number; pending: number; totalAmount: number };
  assets: { total: number };
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  productName: string;
  status: string;
}

interface RecentComplaint {
  id: string;
  complaintNumber: string;
  reportedDate: string;
  title: string;
  problemType: string;
  status: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({
    orders: { total: 0, pending: 0, completed: 0 },
    complaints: { total: 0, open: 0, resolved: 0 },
    bills: { total: 0, paid: 0, pending: 0, totalAmount: 0 },
    assets: { total: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentComplaints, setRecentComplaints] = useState<RecentComplaint[]>([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [orders, complaints, bills, assets] = await Promise.all([
        api.get<any[]>('/orders'),
        api.get<any[]>('/complaints'),
        api.get<any[]>('/bills'),
        api.get<any[]>('/assets'),
      ]);

      setStats({
        orders: {
          total: orders.length,
          pending: orders.filter((o: any) => ['PENDING', 'CONFIRMED'].includes(o.status)).length,
          completed: orders.filter((o: any) => o.status === 'DELIVERED').length,
        },
        complaints: {
          total: complaints.length,
          open: complaints.filter((c: any) => ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'REOPENED'].includes(c.status)).length,
          resolved: complaints.filter((c: any) => ['RESOLVED', 'CLOSED'].includes(c.status)).length,
        },
        bills: {
          total: bills.length,
          paid: bills.filter((b: any) => b.paid || b.status === 'PAID').length,
          pending: bills.filter((b: any) => !b.paid && b.status !== 'PAID').length,
          totalAmount: bills.reduce((sum: number, b: any) => sum + (b.amount ?? 0), 0),
        },
        assets: {
          total: assets.length,
        },
      });

      // Populate recent orders (latest 3)
      setRecentOrders(
        orders.slice(0, 3).map((o: any) => ({
          id: o.id,
          orderNumber: o.orderNumber || '-',
          orderDate: o.orderDate,
          productName: o.productName || '-',
          status: o.status,
        }))
      );

      // Populate recent complaints (latest 3)
      setRecentComplaints(
        complaints.slice(0, 3).map((c: any) => ({
          id: c.id,
          complaintNumber: c.complaintNumber || '-',
          reportedDate: c.reportedDate || c.createdAt,
          title: c.title || c.problemType || '-',
          problemType: c.problemType || '-',
          status: c.status,
        }))
      );
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.orders.total,
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      link: '/clients/order-status',
      details: `${stats.orders.pending} pending`,
    },
    {
      title: 'Open Complaints',
      value: stats.complaints.open,
      change: '-8%',
      trend: 'down',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      link: '/clients/complaint-status',
      details: `${stats.complaints.resolved} resolved`,
    },
    {
      title: 'Pending Bills',
      value: stats.bills.pending,
      change: '+5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      link: '/clients/bills',
      details: `₹${stats.bills.totalAmount.toLocaleString()} total`,
    },
    {
      title: 'Total Assets',
      value: stats.assets.total,
      change: '+2%',
      trend: 'up',
      icon: Printer,
      color: 'from-purple-500 to-purple-600',
      link: '/clients/asset-details',
      details: 'Active printers',
    },
  ];

  const quickActions = [
    { label: 'Create New Order', icon: Package, href: '/clients/new-order', color: 'bg-blue-500' },
    { label: 'Register Complaint', icon: AlertCircle, href: '/clients/new-complaint', color: 'bg-orange-500' },
    { label: 'View Bills', icon: DollarSign, href: '/clients/bills', color: 'bg-green-500' },
    { label: 'Manage Locations', icon: MapPin, href: '/clients/update-locations', color: 'bg-purple-500' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 loading-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name}!</h1>
            <p className="text-blue-100">Here's what's happening with your print management today.</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-blue-100 text-sm">Current Date</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-IN', { 
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.link}>
                <div className="card hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-2">{stat.details}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={action.href}>
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{action.label}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/clients/order-status" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No orders placed yet</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.orderNumber} - {order.productName}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.orderDate)}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Complaints</h2>
            <Link href="/clients/complaint-status" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentComplaints.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No complaints registered yet</p>
            ) : (
              recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{complaint.complaintNumber} - {complaint.title}</p>
                      <p className="text-xs text-gray-500">{formatDate(complaint.reportedDate)}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}