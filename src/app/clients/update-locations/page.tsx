'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/FormInput';
import { SelectBox } from '@/components/SelectBox';
import { Modal } from '@/components/Modal';
import { Edit, User, MapPin, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api, publicGet } from '@/lib/api';

interface Branch {
  id: string;
  name: string;
  address?: string;
  cityId: number;
  city?: { id: number; name: string };
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  userId?: string;
}

interface City {
  id: number;
  name: string;
}

export default function UpdateLocationsPage() {
  const router = useRouter();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    cityId: '',
    pincode: '',
    address: '',
    contactPerson: '',
    mobileNumber: '',
    emailAddress: '',
  });

  useEffect(() => {
    fetchBranches();
    fetchCities();
  }, []);

  const fetchBranches = async () => {
    try {
      const data = await api.get<Branch[]>('/branches');
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
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

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setFormData({
      location: branch.name,
      cityId: branch.cityId?.toString() || '',
      pincode: '',
      address: branch.address || '',
      contactPerson: branch.contactName || '',
      mobileNumber: branch.contactPhone || '',
      emailAddress: branch.contactEmail || '',
    });
    setShowEditModal(true);
  };

  const handleUserIdClick = (branch: Branch) => {
    toast.success(`Password reset email sent to ${branch.contactEmail}`);
    // Implement actual password reset logic here
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/branches/${selectedBranch?.id}`, {
        name: formData.location,
        cityId: formData.cityId,
        address: formData.address,
        contactPerson: formData.contactPerson,
        phone: formData.mobileNumber,
        email: formData.emailAddress,
      });
      toast.success('Profile updated successfully!');
      fetchBranches();
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const columns = [
    { key: 'sr', label: 'SR' },
    { key: 'city', label: 'City' },
    { key: 'branchName', label: 'Branch Name' },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'mobileNumber', label: 'Mobile Number' },
    { key: 'emailId', label: 'Email ID' },
    { key: 'userId', label: 'USER-ID/PASSWORD' },
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
    <>
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Update Locations</h1>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            Click on branch name to update profile | Click on USER-ID to resend userid-password to user
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((column) => (
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
              {branches.map((branch, index) => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {branch.city?.name || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    <button
                      onClick={() => handleBranchClick(branch)}
                      className="text-primary hover:text-blue-700 underline font-medium"
                    >
                      {branch.name}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {branch.contactName || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {branch.contactPhone || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {branch.contactEmail || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    <button
                      onClick={() => handleUserIdClick(branch)}
                      className="flex items-center gap-1 text-primary hover:text-blue-700"
                    >
                      <User className="h-4 w-4" />
                      <span className="underline">Resend</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Update Profile"
        size="lg"
      >
        <form onSubmit={handleUpdateProfile}>
          <FormInput
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />

          <SelectBox
            label="City"
            options={cities.map(city => ({ value: city.id.toString(), label: city.name }))}
            value={formData.cityId}
            onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
            required
          />

          <FormInput
            label="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <FormInput
            label="Contact Person"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            required
          />

          <FormInput
            label="Mobile Number"
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            required
          />

          <FormInput
            label="Email Address"
            type="email"
            value={formData.emailAddress}
            onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
            required
          />

          <div className="flex gap-3 mt-6">
            <button type="submit" className="btn-primary">
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}