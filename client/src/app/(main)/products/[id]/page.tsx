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
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-center items-center">
                        <Image
                            src={product.image}
                            alt={product.productName}
                            width={420}
                            height={420}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-extrabold text-4xl mb-4">
                            {product.productName}
                        </h1>
                        <p className="text-2xl font-semibold mb-4">
                            Giá sản phẩm: {product.price.toLocaleString()} VND
                        </p>
                        <p className="text-xl mb-2"><strong>Thương hiệu:</strong> {product.branch}</p>
                        <p className="text-xl mb-2"><strong>Màu sắc:</strong> {product.color}</p>
                        <p className="text-xl mb-2"><strong>Chất liệu:</strong> {product.material}</p>
                        <p className="text-xl mb-2"><strong>Kích cỡ:</strong> {product.size}</p>
                        <p className="text-xl mb-4"><strong>Mô tả sản phẩm:</strong> {product.description}</p>
                        <div className="flex items-center mt-4">
                            <button
                                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                className="p-2 px-4 rounded-l bg-gray-200 text-black hover:bg-gray-300"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-16 text-2xl font-semibold text-center border-t border-b border-gray-200"
                                min="1"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 px-4 rounded-r bg-gray-200 text-black hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="mt-4 p-2 w-full rounded bg-[#7000FF] text-white hover:bg-[#6816d3] transition-colors"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
