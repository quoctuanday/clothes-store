'use client';
import { useEffect, useState } from 'react';
import { Products } from '@/schema/product';
import Image from 'next/image';

export default function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Products | null>(null);

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
                // Lưu đối tượng sản phẩm vào state product
                setProduct(data.product);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetail();
    }, [params.id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="px-[40px] grid grid-cols-2 mt-[30px] gap-[40px]  ">
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
                    <span className="text-2xl font-semibold block mb-4 leading-normal">
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
                </div>
            </div>
        </div>
    );
}
