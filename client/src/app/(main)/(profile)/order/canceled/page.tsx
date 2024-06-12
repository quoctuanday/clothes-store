'use client';
import { useEffect, useState } from 'react';
import { Orders } from '@/schema/orders';
import Image from 'next/image';
import Link from 'next/link';

function CanceledPage() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [error, setError] = useState<string | null>(null);
    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

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
                    (order: Orders) => order.status === 'Đã hủy'
                );
                setOrders(pendingOrders || []);
            } catch (error) {
                console.log(error);
                setError('Không thể tải mục đơn hàng.');
            }
        };
        fetchData();
    }, []);

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
                                                Thành tiền:{' '}
                                                {formatCurrency(
                                                    item.totalAmount
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex items-center justify-end text-white roboto-regular mb-4">
                                    <Link
                                        href={`/products/${item.productId._id}`}
                                    >
                                        <button className="p-1 px-3  bg-[#6816d3]  rounded mr-10">
                                            Mua lại
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default CanceledPage;
