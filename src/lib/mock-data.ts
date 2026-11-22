export type WashStatus =
  | "NEEDS WASH"
  | "PRIORITY WASH"
  | "Wash In Progress"
  | "WASH COMPLETE";

export type Priority = "high" | "normal" | "low";

export interface Car {
  id: string;
  tag: string;
  stockNumber?: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  color: string;
  colorHex: string;
  location: string;
  status: WashStatus;
  labels: string[];
  notes?: string;
  assignedTo?: string;
  timeInQueue: string;
  keyTag?: string;
  deliveryTime?: string;
  customerName?: string;
}

export const PORTER_NAME = "Alex M.";

export const initialCars: Car[] = [
  {
    id: "1",
    tag: "TG332",
    year: 2026,
    make: "Land Rover",
    model: "Range Rover Sport",
    trim: "Autobiography",
    color: "Santorini Black",
    colorHex: "#1a1a1a",
    location: "Lot C-12",
    status: "PRIORITY WASH",
    labels: ["Has Loaner"],
    notes: "Customer delivery 3:30 PM — full interior + ceramic",
    assignedTo: PORTER_NAME,
    timeInQueue: "4 min",
    keyTag: "K-184",
    deliveryTime: "3:30 PM",
  },
  {
    id: "2",
    tag: "TG333",
    year: 2025,
    make: "Jaguar",
    model: "F-Pace",
    trim: "R-Dynamic SE",
    color: "Eiger Grey",
    colorHex: "#6b6e70",
    location: "Service Lane 2",
    status: "NEEDS WASH",
    labels: ["Has Loaner"],
    notes: "Post-service wash only",
    timeInQueue: "18 min",
    keyTag: "K-092",
  },
  {
    id: "3",
    tag: "TG368",
    year: 2026,
    make: "Land Rover",
    model: "Defender 110",
    trim: "X-Dynamic HSE",
    color: "Carpathian Grey",
    colorHex: "#4a4e51",
    location: "Bay 3",
    status: "NEEDS WASH",
    labels: [],
    notes: "New delivery — full detail required",
    timeInQueue: "7 min",
    keyTag: "K-201",
    deliveryTime: "Tomorrow 10 AM",
  },
  {
    id: "4",
    tag: "TB755",
    year: 2025,
    make: "Land Rover",
    model: "Discovery",
    trim: "S",
    color: "Byron Blue",
    colorHex: "#1e3a5f",
    location: "Lot A-04",
    status: "NEEDS WASH",
    labels: ["Has Loaner", "Parts (2 days)"],
    timeInQueue: "32 min",
    keyTag: "K-055",
  },
  {
    id: "5",
    tag: "TB732",
    year: 2026,
    make: "Jaguar",
    model: "I-Pace",
    trim: "HSE",
    color: "Fuji White",
    colorHex: "#f5f5f0",
    location: "EV Bay 1",
    status: "NEEDS WASH",
    labels: ["Has Loaner", "QUICK LUBE / S"],
    notes: "Quick exterior wipe + charge check",
    timeInQueue: "45 min",
    keyTag: "K-118",
  },
  {
    id: "6",
    tag: "TB725",
    year: 2025,
    make: "Land Rover",
    model: "Range Rover",
    trim: "SE",
    color: "Hakuba Silver",
    colorHex: "#c0c0c0",
    location: "Wash Bay 1",
    status: "Wash In Progress",
    labels: ["Has Loaner"],
    assignedTo: "Jordan R.",
    timeInQueue: "11 min",
    keyTag: "K-210",
  },
  {
    id: "7",
    tag: "TR363",
    year: 2024,
    make: "Jaguar",
    model: "XF",
    trim: "R-Dynamic SE",
    color: "British Racing Green",
    colorHex: "#004225",
    location: "Pickup Lot",
    status: "WASH COMPLETE",
    labels: ["Has Loaner"],
    timeInQueue: "—",
    keyTag: "K-088",
  },
  {
    id: "8",
    tag: "TG366",
    year: 2026,
    make: "Land Rover",
    model: "Defender 90",
    trim: "S",
    color: "Pangea Green",
    colorHex: "#2d4a3e",
    location: "Pickup Lot",
    status: "WASH COMPLETE",
    labels: ["Has Loaner"],
    timeInQueue: "—",
    keyTag: "K-155",
  },
];

export function statusColor(status: WashStatus): string {
  switch (status) {
    case "PRIORITY WASH":
      return "bg-red-600 text-white border-red-500";
    case "NEEDS WASH":
      return "bg-red-500/20 text-red-300 border-red-500/50";
    case "Wash In Progress":
      return "bg-amber-500/20 text-amber-300 border-amber-500/50";
    case "WASH COMPLETE":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
    default:
      return "bg-zinc-500/20 text-zinc-300 border-zinc-500/40";
  }
}

export function rowAccent(status: WashStatus): string {
  switch (status) {
    case "PRIORITY WASH":
      return "border-l-4 border-l-red-500 bg-red-950/40";
    case "NEEDS WASH":
      return "border-l-4 border-l-red-500/70 bg-red-950/25";
    case "Wash In Progress":
      return "border-l-4 border-l-amber-400 bg-amber-950/30";
    case "WASH COMPLETE":
      return "border-l-4 border-l-emerald-500/60 bg-emerald-950/20";
    default:
      return "border-l-4 border-l-zinc-600";
  }
}
