export type CartItems = {
    _id: string;
    cartId: string;
    productId: {
        _id: string;
        productName: string;
        description: string;
        image: string;
        price: number;
        material: string;
        branch: string;
        color: string;
        gender: string;
        size: string;
        quantityInStock: number;
        quantitySold: number;
        type: string;
        deleted: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
        status: string;
    };
    quantity: number;
};
