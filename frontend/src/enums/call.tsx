export const CallPriority = {
    Low: 0,
    Medium: 1,
    High: 2,
} as const;

export type CallPriority = typeof CallPriority[keyof typeof CallPriority];

export const CallStatus = {
    Pending: 0,
    InProgress: 1,
    Completed: 2,
    Cancelled: 3,
} as const;

export type CallStatus = typeof CallStatus[keyof typeof CallStatus];