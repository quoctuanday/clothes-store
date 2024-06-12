'use client';
import { useEffect, useState } from 'react';
import { Order } from '@/schema/order';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';

function AdminOrderPage({ params }: { params: { id: string } }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };
    const handleCancelClick = (orderId: string) => {
        setSelectedOrder(orderId);
        setFormVisible(true);
    };
    const handleCloseForm = () => {
        setFormVisible(false);
        setSelectedOrder(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/order/${params.id}`,
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

    const handleCancelOrder = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/order/status/${selectedOrder}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'Đã hủy' }),
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                throw new Error('Không thể cập nhật trạng thái đơn hàng');
            }

            // Cập nhật trạng thái trong state
            handleCloseForm();
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === selectedOrder
                        ? { ...order, status: 'Đã hủy' }
                        : order
                )
            );
        } catch (error) {
            console.error(error);
            throw new Error('Không thể cập nhật trạng thái đơn hàng.');
        }
    };
    const pageSize = 6;
    const onPageChange = (page: any) => {
        setCurrentPage(page.selected + 1);
    };

    return (
        <div className="px-2">
            <div className="text-center p-8 roboto-bold text-3xl">Đơn hàng</div>
            <Link href="/admin/customer">
                <button className="roboto-regular rounded p-2 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]">
                    Quay lại
                </button>
            </Link>
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
            {orders
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((order, index) => {
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
                                    {(currentPage - 1) * pageSize + index + 1}
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
                                    {formatCurrency(order.totalAmount)}
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
                                        className={`rounded p-3 border mr-2 ${
                                            isStatusChangeDisabled ||
                                            order.status === 'Đã hủy'
                                                ? 'bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed'
                                                : 'hover:bg-[#0dcaf0] hover:text-[black] border-[#0dcaf0] text-[#0dcaf0]'
                                        }`}
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
                                    <button
                                        className={`rounded p-3 border ${
                                            order.status !== 'Chờ xử lí'
                                                ? 'bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed'
                                                : 'hover:bg-[#dc3545] hover:text-[white] border-[#dc3545] text-[#dc3545]'
                                        }`}
                                        onClick={() =>
                                            handleCancelClick(order._id)
                                        }
                                    >
                                        Hủy đơn
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

            {formVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-2xl mb-4 roboto-bold">
                            Hủy đơn hàng
                        </h2>
                        <p className="roboto-thin">
                            Bạn có muốn hủy đơn này không?
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={handleCloseForm}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => {
                                    handleCancelOrder();
                                }}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ReactPaginate
                className="flex my-6  items-center justify-center"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(orders.length / pageSize)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName=" text-white bg-[#7000FF]"
                pageClassName=" rounded mx-2 w-[32px] h-[32px] border flex items-center justify-center hover:text-white  hover:bg-[#7000FF]"
                pageLinkClassName="page-link"
                previousClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center  hover:bg-[#7000FF] ${
                    currentPage === 1
                        ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                previousLinkClassName={`page-link ${
                    currentPage === 1
                        ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                nextClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center hover:text-white hover:bg-[#7000FF] ${
                    currentPage === Math.ceil(orders.length / pageSize)
                        ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                        : ' hover:text-gray-400'
                }`}
                nextLinkClassName={`page-link ${
                    currentPage === Math.ceil(orders.length / pageSize)
                        ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                        : ' hover:text-gray-400'
                }`}
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        </div>
    );
}

export default AdminOrderPage;
