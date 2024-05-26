export interface PaymentModel {
    id: number;
    reservationId: number;
    amount: number;
    paymentMethod: string;
    createdAt: Date;
}