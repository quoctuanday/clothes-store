'use client';
import { useEffect, useState } from 'react';
import { CartItems } from '@/schema/cartItem';
import Image from 'next/image';

function BuyItemPage({ params }: { params: { id: string } }) {
    const [cartItems, setCartItems] = useState<CartItems | null>(null);
    useEffect(() => {
        const fetchItemDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/cart/${params.id}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch item detail');
                }
                const data = await response.json();
                setCartItems(data.product);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItemDetail();
    }, [params.id]);
    if (!cartItems) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Image
                className="shadow rounded"
                src={cartItems.productId.image}
                alt=""
                width={124}
                height={124}
            ></Image>

            <div className="ml-3">
                <h1 className="line-clamp-2 roboto-regular max-w-[175px]">
                    {cartItems.productId.productName}
                </h1>
                <span className="line-clamp-2 roboto-thin text-[#717171] text-sm">
                    {cartItems.productId.color}, {cartItems.productId.size}
                </span>
            </div>
        </div>
    );
}

export default BuyItemPage;
