'use client';
import { useEffect, useState } from 'react';
import { Orders } from '@/schema/orders';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function OrderPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Orders[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
    const [shortLink, setShortLink] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

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
                    (order: Orders) => order.status === 'Chờ xử lí'
                );
                setOrders(pendingOrders || []);
            } catch (error) {
                console.log(error);
                setError('Không thể tải mục đơn hàng.');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const orderIdsToCheck = orders.map((order) => order._id);

        const checkTransactionStatus = async (orderId: string) => {
            try {
                const response = await fetch(
                    `http://localhost:8000/payment/transactions-status`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ orderId }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Không thể kiểm tra trạng thái giao dịch');
                }

                const data = await response.json();
                if (data.message === 'Payment successful and order updated.') {
                    const updatedOrders = orders.map((order) => {
                        if (order._id === orderId) {
                            return { ...order, paymentStatus: 'Đã thanh toán' };
                        }
                        return order;
                    });
                    setOrders(updatedOrders);
                } else {
                    console.log('Payment not successful.');
                }
            } catch (error) {
                console.error(error);
                setError('Không thể kiểm tra trạng thái giao dịch.');
            }
        };

        orderIdsToCheck.forEach((orderId) => {
            // Kiểm tra trạng thái thanh toán chỉ khi status của order chưa phải là "Đã thanh toán"
            if (
                orders.find((order) => order._id === orderId)?.paymentStatus !==
                'Đã thanh toán'
            ) {
                checkTransactionStatus(orderId);
            }
        });
    }, [orders]);

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
            setOrderToCancel(null);
        } catch (error) {
            console.error(error);
            setError('Không thể hủy đơn hàng.');
        }
    };

    const paymentOrder = async (orderId: string, totalAmount: Number) => {
        try {
            const response = await fetch(`http://localhost:8000/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: orderId, amount: totalAmount }),
            });
            if (!response.ok) {
                throw new Error('Không thể cập nhật trạng thái thanh toán');
            }
            const data = await response.json();
            const shortLink = data.shortLink;
            setShortLink(shortLink);
            setNotification('Bạn đang được chuyển đến trang thanh toán...');
            setTimeout(() => {
                router.push(shortLink);
            }, 3000);
        } catch (error) {
            console.error(error);
            setError('Không thể cập nhật trạng thái thanh toán.');
        }
    };

    const confirmCancelOrder = (orderId: string) => {
        setOrderToCancel(orderId);
    };

    const handleCancelConfirmation = () => {
        if (orderToCancel) {
            cancelOrder(orderToCancel);
        }
    };

    const handleCancelDismiss = () => {
        setOrderToCancel(null);
    };

    return (
        <div className="p-6   ">
            <div className="max-h-[666px] overflow-y-scroll">
                {orders.length === 0 ? (
                    <div className="text-center mt-5">
                        Không có đơn hàng nào.{' '}
                        <Link href="/cart" className="underline text-blue-500">
                            Quay về giỏ hàng
                        </Link>
                    </div>
                ) : (
                    <>
                        {orders.map((item) => (
                            <div
                                key={item._id}
                                className="mb-4 p-4 border rounded-md shadow-sm"
                            >
                                <div className="flex items-center">
                                    <Image
                                        className="shadow rounded"
                                        src={item.productId.image}
                                        alt=""
                                        width={124}
                                        height={124}
                                    />
                                    <div className="ml-4 capitalize">
                                        <h1 className="line-clamp-2 font-medium">
                                            {item.productId.productName}
                                        </h1>
                                        <div className="grid grid-cols-7 mt-3 text-gray-700">
                                            <div className="col-span-5 text-sm">
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
                                            <div className="col-span-2 text-right ml-10">
                                                Thành tiền: {item.totalAmount}{' '}
                                                VND
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-4 space-x-2">
                                    <button
                                        className={`px-4 py-2 rounded text-white ${
                                            item.paymentStatus ===
                                            'Đã thanh toán'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#6f00ff] hover:bg-[#6f00ffdf]'
                                        }`}
                                        onClick={() =>
                                            paymentOrder(
                                                item._id,
                                                item.totalAmount
                                            )
                                        }
                                        disabled={
                                            item.paymentStatus ===
                                            'Đã thanh toán'
                                        }
                                    >
                                        Thanh toán
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#ec5d5d] hover:bg-[#ec5d5dd7] text-white rounded"
                                        onClick={() =>
                                            confirmCancelOrder(item._id)
                                        }
                                    >
                                        Hủy đơn hàng
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
            )}

            {notification && (
                <div className="fixed inset-0 rounded bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <p className="text-lg font-bold mb-3">{notification}</p>
                    </div>
                </div>
            )}

            {orderToCancel && (
                <div className="fixed inset-0 rounded bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <p className="text-lg font-bold mb-3">
                            Bạn có chắc chắn muốn hủy đơn hàng này?
                        </p>
                        <div className="flex justify-center space-x-3">
                            <a href="/order">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={handleCancelConfirmation}
                                >
                                    Đồng ý
                                </button>
                            </a>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={handleCancelDismiss}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderPage;
