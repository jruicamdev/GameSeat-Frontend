export interface Reservation {
    id: number;
    userId: number;
    chairId: number;
    createdAt?: Date;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    totalAmount?: number;
}