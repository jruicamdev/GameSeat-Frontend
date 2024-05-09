import { Reservation } from "./reservation";
export interface Chair {
    id: number;
    description: string;
    status: string;
    pricePerHour: number;
    reservations? : Reservation[];
}