export type WashStatus = "NEEDS WASH" | "PRIORITY WASH" | "Wash In Progress" | "WASH COMPLETE";
export type Priority = "high" | "normal" | "low";
export interface Car { id:string; tag:string; year:number; make:string; model:string; trim:string; stockNumber?:string; color:string; colorHex:string; location:string; status:WashStatus; labels:string[]; notes?:string; assignedTo?:string; timeInQueue:string; keyTag?:string; deliveryTime?:string; priority?:Priority; }
export const PORTER_NAME = "Alex M.";
export const initialCars: Car[] = [
{id:"1",tag:"TG332",stockNumber:"JLR-1021",year:2026,make:"Land Rover",model:"Range Rover Sport",trim:"Autobiography",color:"Santorini Black",colorHex:"#1a1a1a",location:"Lot C-12",status:"NEEDS WASH",labels:[],timeInQueue:"4 min",keyTag:"K-184",priority:"high"},
{id:"2",tag:"TG333",stockNumber:"JLR-1022",year:2025,make:"Jaguar",model:"F-Pace",trim:"R-Dynamic SE",color:"Eiger Grey",colorHex:"#6b6e70",location:"Service Lane 2",status:"NEEDS WASH",labels:["Has Loaner"],timeInQueue:"18 min",keyTag:"K-092",priority:"normal"},
{id:"3",tag:"TG368",stockNumber:"JLR-1024",year:2026,make:"Land Rover",model:"Defender 110",trim:"X-Dynamic HSE",color:"Carpathian Grey",colorHex:"#4a4e51",location:"Bay 3",status:"NEEDS WASH",labels:[],timeInQueue:"7 min",keyTag:"K-201"},
{id:"4",tag:"TB755",stockNumber:"JLR-1027",year:2025,make:"Land Rover",model:"Discovery",trim:"S",color:"Byron Blue",colorHex:"#1e3a5f",location:"Lot A-04",status:"NEEDS WASH",labels:["Has Loaner","Parts (2 days)"],timeInQueue:"32 min",keyTag:"K-055"},
{id:"5",tag:"TB732",stockNumber:"JLR-1030",year:2026,make:"Jaguar",model:"I-Pace",trim:"HSE",color:"Fuji White",colorHex:"#f5f5f0",location:"EV Bay 1",status:"NEEDS WASH",labels:["Has Loaner","QUICK LUBE / S"],timeInQueue:"45 min",keyTag:"K-118"},
{id:"6",tag:"TB725",stockNumber:"JLR-1031",year:2025,make:"Land Rover",model:"Range Rover",trim:"SE",color:"Hakuba Silver",colorHex:"#c0c0c0",location:"Wash Bay 1",status:"Wash In Progress",labels:["Has Loaner"],assignedTo:"Jordan R.",timeInQueue:"11 min",keyTag:"K-210"},
{id:"7",tag:"TR363",stockNumber:"JLR-1032",year:2024,make:"Jaguar",model:"XF",trim:"R-Dynamic SE",color:"British Racing Green",colorHex:"#004225",location:"Pickup Lot",status:"WASH COMPLETE",labels:["Has Loaner"],timeInQueue:"—",keyTag:"K-088"},
{id:"8",tag:"TG366",stockNumber:"JLR-1033",year:2026,make:"Land Rover",model:"Defender 90",trim:"S",color:"Pangea Green",colorHex:"#2d4a3e",location:"Pickup Lot",status:"WASH COMPLETE",labels:["Has Loaner"],timeInQueue:"—",keyTag:"K-155"},
{id:"9",tag:"TR335",stockNumber:"JLR-1034",year:2025,make:"Land Rover",model:"Discovery Sport",trim:"S",color:"Firenze Red",colorHex:"#8b1a1a",location:"Pickup Lot",status:"WASH COMPLETE",labels:["Has Loaner"],timeInQueue:"—",keyTag:"K-142"},
];
export function statusColor(status:WashStatus):string { if(status === "NEEDS WASH" || status === "PRIORITY WASH") return "bg-red-100 text-red-700 border-red-200"; if(status === "Wash In Progress") return "bg-amber-100 text-amber-700 border-amber-200"; return "bg-zinc-100 text-zinc-600 border-zinc-200"; }
