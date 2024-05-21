'use client';
import { useEffect, useState } from 'react';
import { CartItems } from '@/schema/cartItem';
import Image from 'next/image';
import UserLoginData from '@/api/UserLogin';
import { BiLocationPlus } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import { CheckIcon } from '@radix-ui/react-icons';
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
                console.log(data);
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
            const response = await fetch(
                'http://localhost:8000/admin/orders/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const result = await response.json();
            console.log('Order created successfully:', result);
            // Optionally redirect or show a success message
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    if (!cartItems) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="text-[#7000FF] flex items-center roboto-bold text-xl m-5 mb-1">
                <FaLocationDot className="mr-3" />
                <span>Địa chỉ nhận hàng</span>
            </div>
            <div className="ml-12  flex items-center roboto-regular">
                <div className="mr-4">
                    {user?.fullName} {user?.phone}
                </div>
                <span>{user?.address}</span>
            </div>
            <div className="grid grid-cols-9 ml-5 gap-2 mt-3">
                <div className="col-span-4 mb-3 flex items-center roboto-bold">
                    Mô tả sản phẩm
                </div>

                <div className="col-span-2 flex items-center roboto-bold ">
                    Đơn giá
                </div>
                <div className="col-span-1 flex items-center justify-center roboto-bold ">
                    Số lượng
                </div>
                <div className="col-span-2 flex items-center  roboto-bold ">
                    Thành tiền
                </div>
            </div>
            <div className="grid grid-cols-9 pl-5 gap-2  hover:bg-slate-200 py-3">
                <div className="col-span-4  flex items-center">
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
                            {cartItems.productId.color},{' '}
                            {cartItems.productId.size}
                            <b />
                            <div className="">
                                Loại: {cartItems.productId.type}
                            </div>
                        </span>
                    </div>
                </div>

                <div className="col-span-2 flex  roboto-regular items-center">
                    {cartItems.productId.price} VND
                </div>
                <div className="col-span-1 flex items-center  roboto-regular justify-center">
                    {cartItems.quantity}
                </div>
                <div className="col-span-2 flex items-center   roboto-regular">
                    {cartItems.productId.price * cartItems.quantity} VND
                </div>
            </div>
            <div className="ml-5 mt-3 mb-3 ">
                <div className="roboto-bold">Phương thức thanh toán</div>
                <div className="mt-1 flex items-center roboto-thin">
                    <span>Chọn phương thức thanh toán</span>
                    <div className="p-2 rounded border-2 border-[#7000FF] ml-4 text-[#7000FF] relative">
                        Chuyển khoản ngân hàng
                        <div className="absolute  bottom-0 right-0 border-[8px]   border-l-transparent border-t-transparent  border-b-[#7000FF] border-r-[#7000FF]">
                            <CgCheck className="absolute top-[-5px] text-white left-[-5px]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-3 mb-3 mx-5">
                <div className="grid grid-cols-2 col-start-4 col-span-1 text-sm roboto-thin">
                    <div className="col-span-1">Tổng tiền hàng</div>
                    <div className="col-span-1 flex justify-end">
                        {cartItems.productId.price * cartItems.quantity} VND
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-3 mb-3 mx-5">
                <div className="grid grid-cols-2 col-start-4 col-span-1 text-sm roboto-thin">
                    <div className="col-span-1">Phí vận chuyển</div>
                    <div className="col-span-1 flex justify-end">0 VND</div>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-3 mb-3 mx-5">
                <div className="grid grid-cols-2 col-start-4 col-span-1 text-sm roboto-thin items-center text-[#7000FF]">
                    <div className="col-span-1">Tổng thanh toán</div>
                    <div className="col-span-1 flex justify-end text-2xl items-center">
                        {cartItems.productId.price * cartItems.quantity}
                        <span className="text-sm ml-1">VND</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-3 mb-5 mx-5 ">
                <div className="flex justify-center col-start-4 col-span-1 text-sm roboto-thin items-center ">
                    <button
                        className="col-span-1 py-2 w-full rounded bg-[#7000FF] hover:bg-[#6f00ffc6] text-white text-center "
                        onClick={handleOrder}
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BuyItemPage;
