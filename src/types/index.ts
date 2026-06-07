export type DeviceType = 'escalator' | 'gate' | 'platform-door';
export type DeviceStatus = 'normal' | 'warning' | 'fault' | 'maintenance';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  station: string;
  stationId: string;
  location: string;
  status: DeviceStatus;
  runHours: number;
  lastMaintenance: string;
  brand: string;
  model: string;
  installDate: string;
  lastFaultCount: number;
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'pending' | 'assigned' | 'processing' | 'completed' | 'closed';

export interface TicketProgress {
  time: string;
  status: string;
  operator: string;
  description: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  station: string;
  reporter: string;
  priority: TicketPriority;
  status: TicketStatus;
  passengerImpact: 'none' | 'minor' | 'moderate' | 'severe';
  passengerImpactDesc: string;
  createdAt: string;
  assignedTo?: string;
  estimatedArrival?: string;
  completedAt?: string;
  progress: number;
  progressTimeline: TicketProgress[];
  photos: string[];
}

export interface InspectionPoint {
  id: string;
  name: string;
  station: string;
  location: string;
  deviceType: DeviceType;
  deviceId?: string;
  checked: boolean;
  checkResult?: 'normal' | 'abnormal';
  remark?: string;
}

export interface InspectionTask {
  id: string;
  name: string;
  date: string;
  inspector: string;
  points: InspectionPoint[];
  completedPoints: string[];
  status: 'pending' | 'in-progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
}

export interface SparePart {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
  location: string;
  lastUpdate: string;
}

export interface SparePartTransfer {
  id: string;
  partId: string;
  partName: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
  applicant: string;
  approver?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  approvedAt?: string;
}

export interface EmergencyPlan {
  id: string;
  title: string;
  type: 'equipment-fault' | 'passenger-incident' | 'fire' | 'power-outage' | 'other';
  level: 'level-1' | 'level-2' | 'level-3';
  content: string;
  steps: string[];
  contacts: { name: string; role: string; phone: string }[];
  updatedAt: string;
}

export interface ServiceStopRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  station: string;
  stopTime: string;
  reason: string;
  impactScope: string;
  estimatedRecovery: string;
  actualRecovery?: string;
  operator: string;
  status: 'stopped' | 'recovered';
}

export interface EventReview {
  id: string;
  eventTitle: string;
  eventTime: string;
  eventType: string;
  description: string;
  causeAnalysis: string;
  improvementMeasures: string;
  responsiblePerson: string;
  participants: string[];
  createdAt: string;
}

export interface DutyRecord {
  id: string;
  date: string;
  shift: 'morning' | 'afternoon' | 'night';
  operator: string;
  events: {
    time: string;
    content: string;
    type: 'normal' | 'warning' | 'fault';
  }[];
  handoverNotes: string;
  nextShiftOperator: string;
  createdAt: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  serviceType: string;
  arrivalTime: string;
  departureTime?: string;
  serviceContent: string;
  rating: number;
  operator: string;
  createdAt: string;
}

export interface Station {
  id: string;
  name: string;
  line: string;
  lineId: string;
  position: { x: number; y: number };
  deviceCount: number;
  faultCount: number;
}

export interface LineData {
  id: string;
  name: string;
  color: string;
  stations: Station[];
}

export interface AnalyticsDataPoint {
  date: string;
  faultCount: number;
  avgRepairTime: number;
  availability: number;
  ticketCount: number;
}

export interface DeviceReliability {
  rank: number;
  deviceName: string;
  deviceType: DeviceType;
  station: string;
  mtbf: number;
  faultCount: number;
  availability: number;
}

export interface KPIData {
  totalDevices: number;
  onlineDevices: number;
  onlineRate: number;
  pendingTickets: number;
  completedTicketsToday: number;
  avgRepairTime: number;
  avgRepairTimeTrend: number;
  pendingTicketsTrend: number;
}
