import { CallPriority, CallStatus } from "../enums/call";

export interface CallRequest {
    title: string;
    description: string;
    priority: CallPriority;
}

export interface CallUpdate extends CallRequest {
    status: CallStatus;
    technicianId: number;
    endedAt: string | null;
}

export interface Call extends CallUpdate {
    id: number;
    createdAt: string;
    technicianName: string;
}

export interface Technician {
    id: number;
    name: string;
}

export interface CallGroup {
    technicianName: string;
    calls: Call[];
}
