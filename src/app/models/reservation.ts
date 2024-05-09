export interface Reservation {
    id: number;
    userId: number;
    chairId: number;
    startTime: string;
    endTime: string;
    status: string;
    totalAmount: number;
    createdAt: string;
}
