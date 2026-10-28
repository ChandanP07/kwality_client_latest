const API_BASE = 'http://localhost:3000';

async function testAPIs() {
  console.log('🧪 Testing API Endpoints...\n');
  
  // First, get auth token
  console.log('1. Testing authentication...');
  const loginResponse = await fetch(`${API_BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'rajesh@example.com',
      password: 'client123'
    })
  });
  
  if (loginResponse.ok) {
    console.log('✅ Authentication working\n');
  } else {
    console.log('❌ Authentication failed\n');
  }

  // Test each API endpoint
  const endpoints = [
    { method: 'GET', path: '/api/orders', name: 'Orders' },
    { method: 'GET', path: '/api/complaints', name: 'Complaints' },
    { method: 'GET', path: '/api/branches', name: 'Branches' },
    { method: 'GET', path: '/api/assets', name: 'Assets' },
    { method: 'GET', path: '/api/bills', name: 'Bills' },
    { method: 'GET', path: '/api/cities', name: 'Cities' },
    { method: 'GET', path: '/api/users/locations', name: 'Locations' }
  ];

  for (const endpoint of endpoints) {
    console.log(`Testing ${endpoint.name}...`);
    try {
      const response = await fetch(`${API_BASE}${endpoint.path}`, {
        method: endpoint.method,
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${endpoint.name}: ${Array.isArray(data) ? data.length : 'OK'} items\n`);
      } else {
        console.log(`❌ ${endpoint.name}: ${response.status} ${response.statusText}\n`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Failed to connect\n`);
    }
  }
}

// Run if server is running
testAPIs().catch(console.error);