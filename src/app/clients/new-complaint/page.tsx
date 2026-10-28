'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/FormInput';
import { SelectBox } from '@/components/SelectBox';
import { api } from '@/lib/api';

// Real state, city, and location data
const LOCATION_DATA = {
  'Maharashtra': {
    'Mumbai': [
      'Andheri East',
      'Andheri West',
      'Bandra',
      'Borivali',
      'Churchgate',
      'Dadar',
      'Goregaon',
      'Juhu',
      'Kandivali',
      'Kurla',
      'Lower Parel',
      'Malad',
      'Marine Lines',
      'Powai',
      'Santacruz',
      'Thane',
      'Vashi',
      'Vikhroli',
      'Wadala',
      'Worli'
    ],
    'Pune': [
      'Aundh',
      'Baner',
      'Camp',
      'Deccan',
      'Hadapsar',
      'Hinjewadi',
      'Kalyani Nagar',
      'Kharadi',
      'Koregaon Park',
      'Kothrud',
      'Magarpatta',
      'Pimpri-Chinchwad',
      'Shivajinagar',
      'Viman Nagar',
      'Wakad'
    ],
    'Nashik': [
      'Ashok Nagar',
      'College Road',
      'Gangapur Road',
      'Indira Nagar',
      'Mumbai Naka',
      'Nashik Road',
      'Panchavati',
      'Satpur',
      'Sharanpur Road',
      'Tidke Colony'
    ],
    'Nagpur': [
      'Civil Lines',
      'Dharampeth',
      'Gandhibagh',
      'Hingna',
      'Kamptee',
      'Laxmi Nagar',
      'Medical Square',
      'Pratap Nagar',
      'Ramdaspeth',
      'Sitabuldi'
    ],
    'Aurangabad': [
      'Beed Bypass',
      'CIDCO',
      'Garkheda',
      'Jalna Road',
      'Kranti Chowk',
      'Nanded Road',
      'Paithan Road',
      'Railway Station',
      'Samarth Nagar',
      'Seven Hills'
    ]
  },
  'Gujarat': {
    'Ahmedabad': [
      'Ashram Road',
      'Bodakdev',
      'C.G. Road',
      'Drive In Road',
      'Ellis Bridge',
      'Gandhinagar',
      'Gota',
      'Gurukul',
      'Maninagar',
      'Navrangpura',
      'Paldi',
      'Prahlad Nagar',
      'Satellite',
      'S.G. Highway',
      'Shahibaug',
      'Thaltej',
      'Vastrapur',
      'Vejalpur'
    ],
    'Surat': [
      'Adajan',
      'Althan',
      'Athwa',
      'Bhatar',
      'City Light',
      'Dumas Road',
      'Ghod Dod Road',
      'Katargam',
      'Majura Gate',
      'Nanpura',
      'Piplod',
      'Ring Road',
      'Rander',
      'Udhna',
      'Varachha',
      'Vesu'
    ],
    'Vadodara': [
      'Akota',
      'Alkapuri',
      'Fatehgunj',
      'Gotri',
      'Karelibaug',
      'Makarpura',
      'Manjalpur',
      'Nizampura',
      'Race Course',
      'Sayajigunj',
      'Subhanpura',
      'Waghodia Road'
    ],
    'Rajkot': [
      'Airport Road',
      'Aji Dam',
      'Bhakti Nagar',
      'Gondal Road',
      'Kalawad Road',
      'Kothariya Road',
      'Madhapar',
      'Mavdi',
      'Raiya Road',
      'Sadhuvasvani Road',
      'University Road',
      'Yagnik Road'
    ],
    'Gandhinagar': [
      'Sector 1-30',
      'Kudasan',
      'Sargasan',
      'Raysan',
      'Infocity',
      'GIFT City',
      'Koba',
      'Adalaj',
      'Randesan',
      'Pethapur'
    ]
  }
};

// Branch mapping based on location - this simulates which branches serve which locations
const BRANCH_LOCATION_MAPPING: { [key: string]: string[] } = {
  'Andheri Branch': ['Andheri East', 'Andheri West', 'Goregaon', 'Jogeshwari'],
  'Bandra Branch': ['Bandra', 'Khar', 'Santacruz'],
  'South Mumbai Branch': ['Churchgate', 'Marine Lines', 'Colaba', 'Fort'],
  'Central Mumbai Branch': ['Dadar', 'Kurla', 'Lower Parel', 'Worli'],
  'Western Suburbs Branch': ['Borivali', 'Kandivali', 'Malad'],
  'Powai Branch': ['Powai', 'Vikhroli', 'Kanjurmarg'],
  'Thane Branch': ['Thane', 'Mulund', 'Airoli'],
  'Navi Mumbai Branch': ['Vashi', 'Nerul', 'Kharghar'],
  // Add more mappings as needed
};

interface Branch {
  id: string;
  name: string;
  cityId: number;
  city?: { name: string };
}

export default function NewComplaintPage() {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [availableBranches, setAvailableBranches] = useState<Branch[]>([]);
  const [formData, setFormData] = useState({
    state: '',
    cityName: '',
    locationName: '',
    branchId: '',
    contactPerson: '',
    contactNumber: '',
    productName: '',
    serialNumber: '',
    problemType: '',
    comments: '',
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    // Update available cities when state changes
    if (formData.state && LOCATION_DATA[formData.state as keyof typeof LOCATION_DATA]) {
      const stateCities = Object.keys(LOCATION_DATA[formData.state as keyof typeof LOCATION_DATA]);
      setAvailableCities(stateCities);
      // Reset city, location and branch when state changes
      setFormData(prev => ({ 
        ...prev, 
        cityName: '', 
        locationName: '', 
        branchId: '' 
      }));
      setAvailableLocations([]);
      setAvailableBranches([]);
    } else {
      setAvailableCities([]);
      setAvailableLocations([]);
      setAvailableBranches([]);
    }
  }, [formData.state]);

  useEffect(() => {
    // Update available locations when city changes
    if (formData.state && formData.cityName) {
      const stateData = LOCATION_DATA[formData.state as keyof typeof LOCATION_DATA];
      if (stateData && stateData[formData.cityName as keyof typeof stateData]) {
        const cityLocations = stateData[formData.cityName as keyof typeof stateData];
        setAvailableLocations(cityLocations);
        // Reset location and branch when city changes
        setFormData(prev => ({ ...prev, locationName: '', branchId: '' }));
        setAvailableBranches([]);
      }
    } else {
      setAvailableLocations([]);
      setAvailableBranches([]);
    }
  }, [formData.cityName, formData.state]);

  useEffect(() => {
    // Update branches when location changes
    if (formData.locationName && formData.cityName) {
      // First, try to filter branches by city
      let filteredBranches = branches.filter(branch => 
        branch.city?.name?.toLowerCase() === formData.cityName.toLowerCase()
      );
      
      // If no branches found for this city, check if branch name contains the location
      if (filteredBranches.length === 0) {
        filteredBranches = branches.filter(branch => {
          const branchName = branch.name.toLowerCase();
          const locationName = formData.locationName.toLowerCase();
          const cityName = formData.cityName.toLowerCase();
          
          // Check if branch name contains location or city name
          return branchName.includes(locationName) || 
                 branchName.includes(cityName) ||
                 locationName.includes(branchName.split(' ')[0]); // Check first word of branch name
        });
      }
      
      // If still no branches found, use all branches as fallback
      if (filteredBranches.length === 0) {
        filteredBranches = branches;
      }
      
      setAvailableBranches(filteredBranches);
      
      // Reset branch selection when available branches change
      if (!filteredBranches.find(b => b.id === formData.branchId)) {
        setFormData(prev => ({ ...prev, branchId: '' }));
      }
    } else {
      setAvailableBranches([]);
    }
  }, [formData.locationName, formData.cityName, branches]);

  const fetchBranches = async () => {
    try {
      const data = await api.get<Branch[]>('/branches');
      
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.state || !formData.cityName || !formData.locationName) {
      toast.error('Please select state, city and location');
      return;
    }

    setLoading(true);

    try {
      const branchId = formData.branchId || availableBranches[0]?.id || null;

      await api.post('/complaints', {
        state: formData.state,
        branchId,
        contactPerson: formData.contactPerson,
        contactNumber: formData.contactNumber,
        productName: formData.productName,
        serialNumber: formData.serialNumber,
        problemType: formData.problemType,
        comments: formData.comments,
      });

      toast.success('Complaint registered successfully!');
      setFormData({
        state: '',
        cityName: '',
        locationName: '',
        branchId: '',
        contactPerson: '',
        contactNumber: '',
        productName: '',
        serialNumber: '',
        problemType: '',
        comments: '',
      });
      setAvailableCities([]);
      setAvailableLocations([]);
      setAvailableBranches([]);
    } catch (error) {
      toast.error('Failed to register complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const states = Object.keys(LOCATION_DATA).map(state => ({
    value: state,
    label: state
  }));

  const cityOptions = availableCities.map(city => ({
    value: city,
    label: city
  }));

  const locationOptions = availableLocations.map(location => ({
    value: location,
    label: location
  }));

  const branchOptions = availableBranches.length > 0
    ? availableBranches.map(branch => ({
        value: branch.id,
        label: branch.name
      }))
    : [{ value: '', label: 'No branches available for selected location' }];

  const problemTypes = [
    { value: 'Paper Jam', label: 'Paper Jam' },
    { value: 'Print Quality', label: 'Print Quality' },
    { value: 'Not Printing', label: 'Not Printing' },
    { value: 'Error Message', label: 'Error Message' },
    { value: 'Hardware Issue', label: 'Hardware Issue' },
    { value: 'Software Issue', label: 'Software Issue' },
    { value: 'Toner/Ink Issue', label: 'Toner/Ink Issue' },
    { value: 'Network Connection', label: 'Network Connection' },
    { value: 'Scanner Issue', label: 'Scanner Issue' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-6">Register New Complaint</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectBox
          label="State"
          options={states}
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          required
        />

        <SelectBox
          label="City"
          options={cityOptions}
          value={formData.cityName}
          onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
          required
          disabled={!formData.state}
        />

        <SelectBox
          label="Location"
          options={locationOptions}
          value={formData.locationName}
          onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
          required
          disabled={!formData.cityName}
        />

        <SelectBox
          label="Branch"
          options={branchOptions}
          value={formData.branchId}
          onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
          disabled={!formData.locationName || availableBranches.length === 0}
        />

        <FormInput
          label="Contact Person"
          value={formData.contactPerson}
          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          required
        />

        <FormInput
          label="Contact Number"
          type="tel"
          pattern="[0-9]{10}"
          placeholder="10 digit mobile number"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          required
        />

        <FormInput
          label="Product Name"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          required
        />

        <FormInput
          label="Serial Number"
          value={formData.serialNumber}
          onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
          required
        />

        <SelectBox
          label="Problem Type"
          options={problemTypes}
          value={formData.problemType}
          onChange={(e) => setFormData({ ...formData, problemType: e.target.value })}
          required
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Problem Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            placeholder="Please describe the issue in detail..."
            required
          />
        </div>

        <div className="md:col-span-2 bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> A technician will contact you within 24 hours at the provided contact number.
          </p>
        </div>

        <div className="md:col-span-2 flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setFormData({
                state: '',
                cityName: '',
                locationName: '',
                branchId: '',
                contactPerson: '',
                contactNumber: '',
                productName: '',
                serialNumber: '',
                problemType: '',
                comments: '',
              });
              setAvailableCities([]);
              setAvailableLocations([]);
              setAvailableBranches([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}