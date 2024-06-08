'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { Order } from '@/schema/order';

function AdminOrderPage({ params }: { params: { id: string } }) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/admin/${params.id}/orders`,
                    {
                        credentials: 'include',
                    }
                );
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu đơn hàng');
                }
                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.log(error);
                throw new Error('Không thể tải đơn hàng.');
            }
        };
        fetchData();
    }, [params.id]);

    const handleStatusChange = async (
        orderId: string,
        currentStatus: string
    ) => {
        const statusSequence = [
            'Chờ xử lí',
            'Chờ lấy hàng',
            'Chờ giao hàng',
            'Đã giao',
        ];

        const currentIndex = statusSequence.indexOf(currentStatus);
        if (currentIndex === -1 || currentIndex === statusSequence.length - 1) {
            return; // Không thay đổi nếu trạng thái hiện tại là "Đã giao" hoặc không xác định
        }

        const nextStatus = statusSequence[currentIndex + 1];

        try {
            const response = await fetch(
                `http://localhost:8000/order/status/${orderId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: nextStatus }),
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                throw new Error('Không thể cập nhật trạng thái đơn hàng');
            }

            // Cập nhật trạng thái trong state
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, status: nextStatus }
                        : order
                )
            );
        } catch (error) {
            console.error(error);
            throw new Error('Không thể cập nhật trạng thái đơn hàng.');
        }
    };

    return (
        <div className="px-2">
            <div className="text-center p-8 roboto-bold text-3xl">Đơn hàng</div>
            <div className="grid grid-cols-12 px-5 roboto-bold gap-1">
                <div className="col-span-1 flex justify-center items-center">
                    Số TT
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Tên sản phẩm
                </div>

                <div className="col-span-1 flex justify-center items-center">
                    Số lượng
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Hàng tồn
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Thành tiền
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Thời gian
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Tình trạng thanh toán
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Trạng thái
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Thao tác
                </div>
            </div>
            {orders.map((order, index) => {
                const product = order.products[0]?.productId;
                const productName = product ? product.productName : 'N/A';
                const quantityInStock = product
                    ? product.quantityInStock
                    : 'N/A';
                const isStatusChangeDisabled =
                    order.status === 'Đã giao' || order.status === 'Đã hủy';
                return (
                    <div key={order._id}>
                        <div className="grid grid-cols-12 px-5 py-2 roboto-regular gap-3">
                            <div className="col-span-1 flex justify-center items-center">
                                {index + 1}
                            </div>
                            <div className="col-span-2 flex items-center line-clamp-2">
                                {productName}
                            </div>

                            <div className="col-span-1 flex justify-center items-center">
                                {order.products[0]?.quantity || 'N/A'}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {quantityInStock}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {order.totalAmount} VND
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                {new Date(order.createdAt).toLocaleString()}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {order.paymentStatus}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {order.status}
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                <button
                                    className="rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0] mr-2"
                                    onClick={() =>
                                        handleStatusChange(
                                            order._id,
                                            order.status
                                        )
                                    }
                                    disabled={isStatusChangeDisabled}
                                >
                                    Chuyển trạng thái
                                </button>
                                <button className="rounded p-3 hover:bg-[#dc3545] hover:text-[white] border-[1px] border-[#dc3545] text-[#dc3545]">
                                    Hủy đơn
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AdminOrderPage;
