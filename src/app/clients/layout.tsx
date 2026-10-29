'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  Package,
  FileText,
  AlertCircle,
  Settings,
  DollarSign,
  MapPin,
  LogOut,
  Printer,
  Home,
  Bell,
  Search,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [notifications] = useState(3);

  const handleLogout = async () => {
    await signOut({ 
      redirect: true,
      callbackUrl: '/login' 
    });
  };

  const links = [
    {
      label: 'Back to Website',
      href: '/',
      icon: <Home className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'Dashboard',
      href: '/clients/dashboard',
      icon: <Printer className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'New Order',
      href: '/clients/new-order',
      icon: <Package className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'Order Status',
      href: '/clients/order-status',
      icon: <FileText className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'New Complaint',
      href: '/clients/new-complaint',
      icon: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'Complaint Status',
      href: '/clients/complaint-status',
      icon: <Settings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'Asset Details',
      href: '/clients/asset-details',
      icon: <Printer className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'Bills',
      href: '/clients/bills',
      icon: <DollarSign className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: 'Update Locations',
      href: '/clients/update-locations',
      icon: <MapPin className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900">
      <Sidebar open={open} setOpen={setOpen} animate>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo Section */}
            <div className="mb-8">
              {open ? <Logo /> : <LogoIcon />}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  isActive={pathname === link.href}
                />
              ))}
            </div>
          </div>

          {/* User Profile Section */}
          <div className="border-t border-gray-200 dark:border-neutral-700 pt-4">
            <div className="mb-4">
              <SidebarLink
                link={{
                  label: session?.user?.name || 'User',
                  href: '/clients/profile',
                  icon: session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={28}
                      height={28}
                      alt="Avatar"
                    />
                  ) : (
                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  ),
                }}
              />
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-2 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {open && (
                <span className="text-sm">Logout</span>
              )}
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {links.find(l => l.href === pathname)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-neutral-700 rounded-lg px-4 py-2 gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm w-48"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Logo Component for expanded sidebar
const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <Printer className="h-5 w-5 text-white" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-pre"
      >
        Kwality Enterprise
      </motion.span>
    </div>
  );
};

// Logo Icon for collapsed sidebar
const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <Printer className="h-5 w-5 text-white" />
      </div>
    </div>
  );
};