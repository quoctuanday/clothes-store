import { Products } from '@/schema/product';
export type OrderDetail = {
    productId: Products;
    quantity: number;
    unitPrice: number;
    discount: number;
};
