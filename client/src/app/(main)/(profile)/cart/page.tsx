'use client';
import { useEffect, useState } from 'react';
import { CartItems } from '@/schema/cartItem';
import Image from 'next/image';
import { BiTrash } from 'react-icons/bi';
import Link from 'next/link';
// Định nghĩa kiểu dữ liệu

function CartPage() {
    const [cartItems, setCartItems] = useState<CartItems[]>([]);
    const [error, setError] = useState<string | null>(null);

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
            } catch (error) {
                console.log(error);
                setError('Không thể tải mục giỏ hàng.');
            }
        };
        fetchData();
    }, []);

    const handleRemoveFromCart = async (itemId: string) => {
        try {
            const response = await fetch(
                `http://localhost:8000/cart/${itemId}`,
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
                prevCartItems.filter((item) => item._id !== itemId)
            );
        } catch (error) {
            console.log(error);
            setError('Không thể xóa sản phẩm khỏi giỏ hàng.');
        }
    };

    return (
        <div className="max-h-[666px] overflow-y-scroll">
            {cartItems.length === 0 ? (
                <div className="text-center mt-5 ">
                    Không có sản phẩm nào được thêm vào giỏ hàng.{' '}
                    <a href="/products" className="underline text-blue-500">
                        Quay về trang sản phẩm
                    </a>
                </div>
            ) : (
                <>
                    <div className="mb-5">
                        <div className="grid grid-cols-12 ml-5 gap-2 mt-3">
                            <div className="col-span-4 mb-3 flex items-center roboto-bold">
                                Mô tả sản phẩm
                            </div>

                            <div className="col-span-2 flex items-center roboto-bold ">
                                Đơn giá
                            </div>
                            <div className="col-span-1 flex items-center roboto-bold ">
                                Số lượng
                            </div>
                            <div className="col-span-2 flex items-center justify-center roboto-bold ">
                                Thành tiền
                            </div>
                            <div className="col-span-3 flex items-center roboto-bold justify-center">
                                Thao tác
                            </div>
                        </div>
                    </div>
                    {cartItems.map((item) => (
                        <div key={item._id}>
                            <div className="grid grid-cols-12 pl-5 gap-2  hover:bg-slate-200 py-3">
                                <div className="col-span-4  flex items-center">
                                    <Image
                                        className="shadow rounded"
                                        src={item.productId.image}
                                        alt=""
                                        width={124}
                                        height={124}
                                    ></Image>

                                    <div className="ml-3">
                                        <h1 className="line-clamp-2 roboto-regular max-w-[175px]">
                                            {item.productId.productName}
                                        </h1>
                                        <span className="line-clamp-2 roboto-thin text-[#717171] text-sm">
                                            {item.productId.color},{' '}
                                            {item.productId.size}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-span-2 flex items-center roboto-regular">
                                    {item.productId.price} VND
                                </div>
                                <div className="col-span-1 flex items-center justify-center roboto-regular">
                                    {item.quantity}
                                </div>
                                <div className="col-span-2 flex items-center  justify-center roboto-regular">
                                    {item.productId.price * item.quantity} VND
                                </div>
                                <div className="col-span-3 flex items-center justify-center">
                                    <button className=" p-2 rounded bg-[#7000FF] hover:bg-[#6f00ffb5] text-white mr-3 roboto-regular">
                                        <Link href={`cart/${item._id}`}>
                                            Mua hàng
                                        </Link>
                                    </button>
                                    <button
                                        className=" p-2 rounded bg-red-500 hover:bg-[#f37575] text-white"
                                        onClick={() =>
                                            handleRemoveFromCart(item._id)
                                        }
                                    >
                                        <BiTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default CartPage;
