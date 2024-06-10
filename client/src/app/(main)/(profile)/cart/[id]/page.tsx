'use client';
import { useEffect, useState } from 'react';
import { CartItems } from '@/schema/cartItem';
import Image from 'next/image';
import UserLoginData from '@/api/UserLogin';
import { FaLocationDot } from 'react-icons/fa6';
import { CgCheck } from 'react-icons/cg';

function BuyItemPage({ params }: { params: { id: string } }) {
    const user = UserLoginData();
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
                setCartItems(data.cartItem);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItemDetail();
    }, [params.id]);

    const handleOrder = async () => {
        if (!cartItems) return;

        const orderData = {
            userId: user?._id,
            productId: cartItems.productId._id,
            quantity: cartItems.quantity,
        };

        try {
            const response = await fetch('http://localhost:8000/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const result = await response.json();
            console.log('Order created successfully:', result);

            await fetch(`http://localhost:8000/cart/${cartItems._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    if (!cartItems) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white shadow rounded-md max-w-4xl mx-auto">
            <div className="text-[#7000FF] flex items-center font-bold text-xl mb-4">
                <FaLocationDot className="mr-3" />
                <span>Địa chỉ nhận hàng</span>
            </div>
            <div className="ml-6 mb-4 flex items-center text-gray-700">
                <div className="mr-4">
                    {user?.fullName} {user?.phone}
                </div>
                <span>{user?.address}</span>
            </div>
            <div className="grid grid-cols-9 gap-2 mb-4">
                <div className="col-span-4 font-bold">Mô tả sản phẩm</div>
                <div className="col-span-2 font-bold">Đơn giá</div>
                <div className="col-span-1 font-bold text-center">Số lượng</div>
                <div className="col-span-2 font-bold">Thành tiền</div>
            </div>
            <div className="grid grid-cols-9 gap-2 p-4 bg-gray-100 rounded mb-4">
                <div className="col-span-4 flex items-center">
                    <Image
                        className="shadow rounded"
                        src={cartItems.productId.image}
                        alt=""
                        width={124}
                        height={124}
                    />
                    <div className="ml-3">
                        <h1 className="line-clamp-2 font-medium max-w-[175px]">
                            {cartItems.productId.productName}
                        </h1>
                        <span className="line-clamp-2 text-gray-500 text-sm">
                            {cartItems.productId.color},{' '}
                            {cartItems.productId.size}
                            <div>Loại: {cartItems.productId.type}</div>
                        </span>
                    </div>
                </div>
                <div className="col-span-2 flex items-center">
                    {cartItems.productId.price} VND
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    {cartItems.quantity}
                </div>
                <div className="col-span-2 flex items-center">
                    {cartItems.productId.price * cartItems.quantity} VND
                </div>
            </div>
            <div className="mb-4">
                <div className="font-bold">Phương thức thanh toán</div>
                <div className="mt-1 flex items-center text-gray-700">
                    <span>Chọn phương thức thanh toán</span>
                    <div className="p-2 rounded border-2 border-[#7000FF] ml-4 text-[#7000FF] relative">
                        Chuyển khoản ngân hàng
                        <div className="absolute bottom-0 right-0 border-[8px] border-l-transparent border-t-transparent border-b-[#7000FF] border-r-[#7000FF]">
                            <CgCheck className="absolute top-[-5px] text-white left-[-5px]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 mb-4">
                <div className="text-sm text-gray-500">Tổng tiền hàng</div>
                <div className="text-sm text-gray-500 text-right">
                    {cartItems.productId.price * cartItems.quantity} VND
                </div>
            </div>
            <div className="grid grid-cols-2 mb-4">
                <div className="text-sm text-gray-500">Phí vận chuyển</div>
                <div className="text-sm text-gray-500 text-right">0 VND</div>
            </div>
            <div className="grid grid-cols-2 mb-4 text-[#7000FF]">
                <div className="text-sm">Tổng thanh toán</div>
                <div className="text-2xl text-right">
                    {cartItems.productId.price * cartItems.quantity}
                    <span className="text-sm ml-1">VND</span>
                </div>
            </div>
            <div className="flex justify-end">
                <a href="http://localhost:3000/order">
                    <button
                        className="py-2 px-6 rounded bg-[#7000FF] hover:bg-[#6f00ffc6] text-white"
                        onClick={handleOrder}
                    >
                        Đặt hàng
                    </button>
                </a>
            </div>
        </div>
    );
}

export default BuyItemPage;
