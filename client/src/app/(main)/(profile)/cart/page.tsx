'use client';
import { useEffect, useState } from 'react';
import { CartItems } from '@/schema/cartItem';
import Image from 'next/image';
import { BiTrash } from 'react-icons/bi';
import Link from 'next/link';

function CartPage() {
    const [cartItems, setCartItems] = useState<CartItems[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [itemToRemove, setItemToRemove] = useState<string | null>(null);
    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/cart', {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu giỏ hàng');
                }

                const data = await response.json();
                setCartItems(data.cartItem || []);
                const totalItems = data.cartItem ? data.cartItem.length : 0;
                localStorage.setItem('cartItemCount', totalItems.toString());
            } catch (error) {
                console.log(error);
                setError('Không thể tải mục giỏ hàng.');
            }
        };
        fetchData();
    }, []);

    const handleRemoveFromCart = async (itemId: string) => {
        setItemToRemove(itemId);
    };

    const confirmRemoveFromCart = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/cart/${itemToRemove}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            if (!response.ok) {
                throw new Error('Không thể xóa sản phẩm khỏi giỏ hàng');
            }
            // Xóa mục khỏi giỏ hàng cục bộ
            setCartItems((prevCartItems) =>
                prevCartItems.filter((item) => item._id !== itemToRemove)
            );
            setItemToRemove(null);
        } catch (error) {
            console.log(error);
            setError('Không thể xóa sản phẩm khỏi giỏ hàng.');
        }
    };

    const cancelRemoveFromCart = () => {
        setItemToRemove(null);
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow rounded-md max-w-4xl">
            {cartItems.length === 0 ? (
                <div className="text-center mt-5">
                    Không có sản phẩm nào được thêm vào giỏ hàng.{' '}
                    <Link href="/products" className="underline text-blue-500">
                        Quay về trang sản phẩm
                    </Link>
                </div>
            ) : (
                <>
                    <div className="">
                        <div className="grid grid-cols-12 gap-2 p-3 font-bold border-b-2">
                            <div className="col-span-4">Mô tả sản phẩm</div>
                            <div className="col-span-2 text-center">
                                Đơn giá
                            </div>
                            <div className="col-span-1 w-[65px]">Số lượng</div>
                            <div className="col-span-2 text-center">
                                Thành tiền
                            </div>
                            <div className="col-span-3 text-center">
                                Thao tác
                            </div>
                        </div>
                    </div>
                    {cartItems.map((item) => (
                        <div key={item._id} className="border-b-2">
                            <div className="grid grid-cols-12 gap-2 py-3 hover:bg-slate-200">
                                <div className="col-span-4 flex items-center">
                                    <Link
                                        href={`products/${item.productId._id}`}
                                        className="flex items-center"
                                    >
                                        <Image
                                            className="shadow rounded ml-2"
                                            src={item.productId.image}
                                            alt={item.productId.productName}
                                            width={124}
                                            height={124}
                                        />
                                        <div className="ml-3">
                                            <h1 className="line-clamp-2 font-medium">
                                                {item.productId.productName}
                                            </h1>
                                            <span className="line-clamp-2 text-gray-500 text-sm">
                                                {item.productId.color},{' '}
                                                {item.productId.size}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                    {formatCurrency(item.productId.price)}
                                </div>
                                <div className="col-span-1 flex items-center justify-center">
                                    {item.quantity}
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                    {formatCurrency(
                                        item.productId.price * item.quantity
                                    )}
                                </div>
                                <div className="col-span-3 flex items-center justify-center space-x-2">
                                    <Link href={`cart/${item._id}`}>
                                        <button className="px-4 py-2 bg-[#7000FF] hover:bg-[#6f00ffb5] text-white rounded flex items-center space-x-1">
                                            <span>Mua hàng</span>
                                        </button>
                                    </Link>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-[#f37575] text-white rounded flex items-center space-x-1"
                                        onClick={() =>
                                            handleRemoveFromCart(item._id)
                                        }
                                    >
                                        <BiTrash size={20} />
                                        <span>Xóa</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {itemToRemove && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-5 rounded-lg shadow-lg">
                                <p className="text-lg font-bold mb-3">
                                    Bạn có chắc chắn muốn xóa sản phẩm này khỏi
                                    giỏ hàng?
                                </p>
                                <div className="flex justify-center">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded mr-3"
                                        onClick={confirmRemoveFromCart}
                                    >
                                        Đồng ý
                                    </button>

                                    <button
                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                        onClick={cancelRemoveFromCart}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
            )}
        </div>
    );
}

export default CartPage;
