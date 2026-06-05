import { CallPriority, CallStatus } from "../enums/call";

export interface CallRequest {
    title: string;
    description: string;
    priority: CallPriority;
}

export interface CallUpdate extends CallRequest {
    status: CallStatus;
    endedAt: string | null;
}