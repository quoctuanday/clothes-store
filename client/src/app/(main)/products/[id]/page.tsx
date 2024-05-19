'use client';
import { useEffect, useState } from 'react';
import { Products } from '@/schema/product';
import Image from 'next/image';

export default function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Products | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/products/${params.id}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch product detail');
                }
                const data = await response.json();
                setProduct(data.product);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetail();
    }, [params.id]);

    const handleAddToCart = async () => {
        if (!product) return;

        try {
            const response = await fetch('http://localhost:8000/user/addcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId: product._id,
                    quantity,
                }),
            });

            if (response.ok) {
                alert('Thêm vào giỏ hàng thành công');
            } else {
                alert('Thêm vào giỏ hàng thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Thêm vào giỏ hàng thất bại');
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setQuantity(value > 0 ? value : 1);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="px-[40px] grid grid-cols-2 mt-[50px] gap-[40px]  ">
                <div className="col-span-1 flex justify-center items-center ">
                    <Image
                        src={product.image}
                        alt="anh san pham"
                        width={420}
                        height={420}
                    />
                </div>
                <div className="col-span-1 text-start">
                    <h1 className="font-extrabold text-4xl">
                        {product.productName}
                    </h1>
                    <span className="text-2xl font-semibold block mb-4 leading-normal mt-2">
                        Giá sản phẩm: {product.price} VND
                    </span>
                    <span className="text-2xl font-semibold block mb-4 leading-normal">
                        Thương hiệu: {product.branch}
                    </span>
                    <span className="text-2xl font-semibold block mb-4 leading-normal">
                        Màu sắc : {product.color}
                    </span>
                    <span className="text-2xl font-semibold block mb-4 leading-normal">
                        Chất liệu : {product.material}
                    </span>
                    <span className="text-2xl font-semibold block mb-4 leading-normal">
                        Kích cỡ: {product.size}
                    </span>
                    <span className="text-2xl font-semibold block mb-4 leading-normal">
                        Mô tả sản phẩm: {product.description}
                    </span>
                    <div className="flex items-center">
                        <div className="flex items-center mt-4">
                            <button
                                onClick={() =>
                                    setQuantity(quantity > 1 ? quantity - 1 : 1)
                                }
                                className="p-2 px-4 rounded bg-gray-300 text-black hover:bg-gray-400"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="mx-4 text-2xl font-semibold text-center border rounded p-2 "
                                min="1"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 px-4 rounded bg-gray-300 text-black hover:bg-gray-400"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="mt-4 ml-6 p-2 rounded bg-[#7000FF] text-white hover:bg-[#6816d3] roboto-regular"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
