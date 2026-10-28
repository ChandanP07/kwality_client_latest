export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Order {
  id: string;
  orderDate: Date;
  state: string;
  cityId?: number;
  locationId?: string;
  productName: string;
  serialNumber: string;
  type: string;
  modelNumber: string;
  quantity: number;
  contactPerson: string;
  contactNumber: string;
  poNumber?: string;
  comments?: string;
  status: string;
  trackingNumber?: string;
  city?: City;
  location?: Location;
}

export interface Complaint {
  id: string;
  createdAt: Date;
  state: string;
  branchId?: string;
  contactPerson: string;
  contactNumber: string;
  productName: string;
  serialNumber: string;
  problemType: string;
  comments?: string;
  status: string;
  branch?: Branch;
  callLogs?: CallLog[];
}

export interface CallLog {
  id: string;
  complaintId?: string;
  callDate: Date;
  doneDate?: Date;
  details?: string;
  loggedBy?: string;
  clientFeedback?: string;
  callDone: boolean;
}

export interface Bill {
  id: string;
  billDate: Date;
  invoiceNo: string;
  attachment?: string;
  cityId?: number;
  locationId?: string;
  amount: number;
  overdue: boolean;
  paid: boolean;
  city?: City;
  location?: Location;
}

export interface City {
  id: number;
  name: string;
  pincode?: string;
}

export interface Branch {
  id: string;
  name: string;
  cityId: number;
  address?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  city?: City;
  locations?: Location[];
}

export interface Location {
  id: string;
  name: string;
  pincode?: string;
  address?: string;
  branchId: string;
}

export interface ClientPrinter {
  id: string;
  serialNumber: string;
  clientName: string;
  modelId?: string;
  model?: PrinterModel;
  branchId?: string;
  createdAt: Date;
}

export interface PrinterModel {
  id: string;
  name: string;
}