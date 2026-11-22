export type Priority = "high" | "normal" | "low";
export type CarStatus = "queued" | "assigned" | "in_progress" | "completed";

export interface Car {
  id: string;
  stockNumber: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  color: string;
  colorHex: string;
  location: string;
  priority: Priority;
  status: CarStatus;
  notes?: string;
  assignedTo?: string;
  timeInQueue: string;
  keyTag?: string;
  deliveryTime?: string;
}

export const PORTER_NAME = "Alex M.";

export const initialCars: Car[] = [
  {
    id: "1",
    stockNumber: "LR26047",
    year: 2026,
    make: "Land Rover",
    model: "Range Rover Sport",
    trim: "Autobiography",
    color: "Santorini Black",
    colorHex: "#1a1a1a",
    location: "Lot C-12",
    priority: "high",
    status: "assigned",
    notes: "Customer delivery 3:30 PM — full interior + ceramic top-up",
    assignedTo: PORTER_NAME,
    timeInQueue: "4 min",
    keyTag: "K-184",
    deliveryTime: "3:30 PM",
  },
  {
    id: "2",
    stockNumber: "JG25112",
    year: 2025,
    make: "Jaguar",
    model: "F-Pace",
    trim: "R-Dynamic SE",
    color: "Eiger Grey",
    colorHex: "#6b6e70",
    location: "Service Lane 2",
    priority: "normal",
    status: "queued",
    notes: "Post-service wash only",
    timeInQueue: "18 min",
    keyTag: "K-092",
  },
  {
    id: "3",
    stockNumber: "LR26031",
    year: 2026,
    make: "Land Rover",
    model: "Defender 110",
    trim: "X-Dynamic HSE",
    color: "Carpathian Grey",
    colorHex: "#4a4e51",
    location: "Bay 3",
    priority: "high",
    status: "queued",
    notes: "New delivery — full detail required",
    timeInQueue: "7 min",
    keyTag: "K-201",
    deliveryTime: "Tomorrow 10 AM",
  },
  {
    id: "4",
    stockNumber: "LR25988",
    year: 2025,
    make: "Land Rover",
    model: "Discovery",
    trim: "S",
    color: "Byron Blue",
    colorHex: "#1e3a5f",
    location: "Lot A-04",
    priority: "normal",
    status: "queued",
    timeInQueue: "32 min",
    keyTag: "K-055",
  },
  {
    id: "5",
    stockNumber: "JG26003",
    year: 2026,
    make: "Jaguar",
    model: "I-Pace",
    trim: "HSE",
    color: "Fuji White",
    colorHex: "#f5f5f0",
    location: "EV Bay 1",
    priority: "low",
    status: "queued",
    notes: "Quick exterior wipe + charge check",
    timeInQueue: "45 min",
    keyTag: "K-118",
  },
];
