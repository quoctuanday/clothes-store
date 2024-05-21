'use client';
import { useEffect, useState } from 'react';
import { order } from '@/schema/order';
import Image from 'next/image';
import Link from 'next/link';
// Định nghĩa kiểu dữ liệu

function OrderPage() {
    const [orders, setOrders] = useState<order[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/order', {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu đơn hàng');
                }

                const data = await response.json();
                const pendingOrders = data.orders.filter(
                    (order: order) => order.status === 'Chờ xử lí'
                );
                setOrders(pendingOrders || []);
            } catch (error) {
                console.log(error);
                setError('Không thể tải mục đơn hàng.');
            }
        };
        fetchData();
    }, []);

    const cancelOrder = async (orderId: string) => {
        try {
            const response = await fetch(
                `http://localhost:8000/order/${orderId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'Đã hủy' }),
                }
            );
            if (!response.ok) {
                throw new Error('Không thể hủy đơn hàng');
            }
            const updatedOrders = orders.map((order) => {
                if (order._id === orderId) {
                    return { ...order, status: 'Đã hủy' };
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (error) {
            console.error(error);
            setError('Không thể hủy đơn hàng.');
        }
    };

    const paymentOrder = async (orderId: string) => {
        try {
            const response = await fetch(
                `http://localhost:8000/order/${orderId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ paymentStatus: 'Đã thanh toán' }),
                }
            );
            if (!response.ok) {
                throw new Error('Không thể hủy thanh toán');
            }
            const updatedOrders = orders.map((order) => {
                if (order._id === orderId) {
                    return { ...order, status: 'Đã hủy' };
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (error) {
            console.error(error);
            setError('Không thể hủy đơn hàng.');
        }
    };

    return (
        <div>
            <div className="max-h-[666px] overflow-y-scroll">
                {orders.length === 0 ? (
                    <div className="text-center mt-5 ">
                        Không có đơn hàng nào.{' '}
                        <a href="/cart" className="underline text-blue-500">
                            Quay về giỏ hàng
                        </a>
                    </div>
                ) : (
                    <>
                        {orders.map((item) => (
                            <div key={item._id}>
                                <div className="p-4 flex items-center">
                                    <Image
                                        className="shadow rounded"
                                        src={item.productId.image}
                                        alt=""
                                        width={124}
                                        height={124}
                                    ></Image>
                                    <div className=" ml-4 capitalize">
                                        <h1 className="line-clamp-2 roboto-regular">
                                            {item.productId.productName}
                                        </h1>
                                        <div className="grid grid-cols-7 mt-3 ">
                                            <div className="col-span-5 text-sm roboto-thin">
                                                <span className="block">
                                                    Phân loại:{' '}
                                                    {item.productId.type}
                                                </span>
                                                <span className="block">
                                                    Màu sắc:{' '}
                                                    {item.productId.color}
                                                </span>

                                                <span>
                                                    Kích cỡ:{' '}
                                                    {item.productId.size}
                                                </span>
                                            </div>
                                            <div className="col-span-2 text-right ml-10 roboto-regular">
                                                Thành tiền: {item.totalAmount}{' '}
                                                VND
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex items-center justify-end text-white roboto-regular mb-4">
                                    <button
                                        className={`p-1 ${
                                            item.paymentStatus ===
                                            'Đã thanh toán'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#6f00ff] hover:bg-[#6f00ffdf]'
                                        } rounded mr-2`}
                                        onClick={() => paymentOrder(item._id)}
                                        disabled={
                                            item.paymentStatus ===
                                            'Đã thanh toán'
                                        }
                                    >
                                        Thanh toán
                                    </button>
                                    <button
                                        className="p-1 bg-[#ec5d5d] hover:bg-[#ec5d5dd7] rounded mr-2"
                                        onClick={() => cancelOrder(item._id)}
                                    >
                                        Hủy đơn hàng
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default OrderPage;
