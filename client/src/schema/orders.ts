import { Products } from '@/schema/product';
export type Orders = {
    _id: string;
    userId: string;
    status: string;
    totalAmount: number;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    productId: Products;
};
