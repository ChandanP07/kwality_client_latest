'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/FormInput';
import { SelectBox } from '@/components/SelectBox';
import { api, publicGet } from '@/lib/api';

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

interface City {
  id: number;
  name: string;
}

interface Location {
  id: string;
  name: string;
  branchId: string;
}

export default function NewOrderPage() {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    state: '',
    cityId: '',
    cityName: '',
    locationId: '',
    locationName: '',
    productName: '',
    serialNumber: '',
    type: '',
    modelNumber: '',
    quantity: '1',
    contactPerson: '',
    contactNumber: '',
    poNumber: '',
    comments: '',
  });

  useEffect(() => {
    fetchCities();
    fetchLocations();
  }, []);

  useEffect(() => {
    // Update available cities when state changes
    if (formData.state && LOCATION_DATA[formData.state as keyof typeof LOCATION_DATA]) {
      const stateCities = Object.keys(LOCATION_DATA[formData.state as keyof typeof LOCATION_DATA]);
      setAvailableCities(stateCities);
      // Reset city and location when state changes
      setFormData(prev => ({ ...prev, cityId: '', cityName: '', locationId: '', locationName: '' }));
      setAvailableLocations([]);
    } else {
      setAvailableCities([]);
      setAvailableLocations([]);
    }
  }, [formData.state]);

  useEffect(() => {
    // Update available locations when city changes
    if (formData.state && formData.cityName) {
      const stateData = LOCATION_DATA[formData.state as keyof typeof LOCATION_DATA];
      if (stateData && stateData[formData.cityName as keyof typeof stateData]) {
        const cityLocations = stateData[formData.cityName as keyof typeof stateData];
        setAvailableLocations(cityLocations);
        // Reset location when city changes
        setFormData(prev => ({ ...prev, locationId: '', locationName: '' }));
      }
    } else {
      setAvailableLocations([]);
    }
  }, [formData.cityName, formData.state]);

  const fetchCities = async () => {
    try {
      const data = await publicGet<City[]>('/cities');
      
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const data = await api.get<any[]>('/locations');
      if (Array.isArray(data)) {
        const allLocations = data.flatMap((branch: any) => branch.locations ?? []);
        setLocations(allLocations);
      }
    } catch (error) {
      console.warn('Could not fetch locations from server, using default locations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.state || !formData.cityName || !formData.locationName) {
      toast.error('Please select state, city and location');
      return;
    }

    setLoading(true);

    try {
      // Find or use the city ID from database
      let cityId = formData.cityId;
      if (!cityId) {
        // Try to find city in database by name
        const city = cities.find(c => c.name.toLowerCase() === formData.cityName.toLowerCase());
        if (city) {
          cityId = city.id.toString();
        }
      }

      // Find or use location ID
      let locationId = formData.locationId;
      if (!locationId) {
        // Try to find location in database by name
        const location = locations.find(l => l.name.toLowerCase() === formData.locationName.toLowerCase());
        if (location) {
          locationId = location.id;
        }
      }

      await api.post('/orders', {
        ...formData,
        cityId: cityId || null,
        locationId: locationId || null,
      });
      toast.success('Order created successfully!');
      setFormData({
        state: '',
        cityId: '',
        cityName: '',
        locationId: '',
        locationName: '',
        productName: '',
        serialNumber: '',
        type: '',
        modelNumber: '',
        quantity: '1',
        contactPerson: '',
        contactNumber: '',
        poNumber: '',
        comments: '',
      });
      setAvailableCities([]);
      setAvailableLocations([]);
    } catch (error) {
      toast.error('Failed to create order. Please try again.');
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

  const productTypes = [
    { value: 'Toner', label: 'Toner' },
    { value: 'Cartridge', label: 'Cartridge' },
    { value: 'Drum', label: 'Drum' },
    { value: 'Paper', label: 'Paper' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>

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
          label="Type"
          options={productTypes}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />

        <FormInput
          label="Model Number"
          value={formData.modelNumber}
          onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
          required
        />

        <FormInput
          label="Quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
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
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          required
        />

        <FormInput
          label="PO Number"
          value={formData.poNumber}
          onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Creating...' : 'Create Order'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setFormData({
                state: '',
                cityId: '',
                cityName: '',
                locationId: '',
                locationName: '',
                productName: '',
                serialNumber: '',
                type: '',
                modelNumber: '',
                quantity: '1',
                contactPerson: '',
                contactNumber: '',
                poNumber: '',
                comments: '',
              });
              setAvailableCities([]);
              setAvailableLocations([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}