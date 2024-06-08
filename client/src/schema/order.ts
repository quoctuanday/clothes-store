import { OrderDetail } from '@/schema/orderDetail';
export type Order = {
    _id: string;
    userId: string;
    status: string;
    totalAmount: number;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    products: OrderDetail[];
};
