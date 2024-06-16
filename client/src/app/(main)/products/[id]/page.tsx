'use client';
import { useEffect, useState } from 'react';
import { Products } from '@/schema/product';
import Image from 'next/image';

export default function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Products | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [maxQuantity, setMaxQuantity] = useState<number>(1);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

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
                setMaxQuantity(data.product.quantityInStock); // Lưu trữ số lượng hàng tồn
                if (data.product.quantityInStock === 0) {
                    setQuantity(0); // Nếu hàng tồn = 0, vô hiệu hóa số lượng mặc định
                }
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
        let value = parseInt(e.target.value, 10);
        if (value < 1) {
            value = 1; // Đảm bảo số lượng tối thiểu là 1
        } else if (value > maxQuantity) {
            value = maxQuantity; // Đảm bảo không vượt quá số lượng hàng tồn
        }
        setQuantity(value);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="px-[40px] grid grid-cols-2 mt-[50px] gap-[40px]">
                <div className="col-span-1 flex justify-center items-center">
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
                        Giá sản phẩm: {formatCurrency(product.price)}
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
                    <span className="text-2xl font-semibold block mb-4 leading-normal">
                        Hàng tồn kho: {product.quantityInStock}
                    </span>

                    <div className="flex items-center">
                        <div className="flex items-center mt-4">
                            <button
                                onClick={() =>
                                    setQuantity(quantity > 1 ? quantity - 1 : 1)
                                }
                                className="p-2 px-4 rounded bg-gray-300 text-black hover:bg-gray-400"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="mx-4 text-2xl font-semibold text-center border rounded p-2"
                                min="1"
                                max={maxQuantity}
                            />
                            <button
                                onClick={() =>
                                    setQuantity(
                                        quantity < maxQuantity
                                            ? quantity + 1
                                            : maxQuantity
                                    )
                                }
                                className="p-2 px-4 rounded bg-gray-300 text-black hover:bg-gray-400"
                                disabled={
                                    quantity >= maxQuantity || maxQuantity === 0
                                }
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className={`mt-4 ml-6 p-2 rounded ${
                                maxQuantity === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#7000FF] text-white hover:bg-[#6816d3]'
                            }`}
                            disabled={maxQuantity === 0}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
