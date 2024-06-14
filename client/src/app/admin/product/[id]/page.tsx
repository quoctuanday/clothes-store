'use client';
import React, { useEffect, useState } from 'react';
import { Products } from '@/schema/product';
import ProductData from '@/api/Product';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function EditProduct({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [product, setProduct] = useState<Products | null>();
    const [formData, setFormData] = useState<Products>({
        _id: '',
        productName: '',
        branch: '',
        gender: '',
        type: '',
        size: '',
        color: '',
        description: '',
        material: '',
        image: '',
        quantityInStock: 0,
        quantitySold: 0,
        price: 0,
    });

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

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            gender: e.target.value,
        });
    };
    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            size: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product?._id) {
            alert('Product ID không tồn tại');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8000/products/update/${product._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Cập nhật thành công');
                setTimeout(() => {
                    router.push('/admin/product');
                }, 2000);
            } else {
                alert('Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Cập nhật thất bại');
        }
    };

    return (
        <div className="px-2">
            <div className="text-center p-10 roboto-bold text-3xl">
                Sửa sản phẩm
            </div>
            <div className="mb-6">
                <Link href="/admin/product">
                    <button className="roboto-regular rounded px-4 py-2 border-2 border-[#0dcaf0] text-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-[black] transition duration-300 ease-in-out">
                        Quay lại
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <form className="px-5 col-span-2" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Tên sản phẩm:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="text"
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Thương hiệu:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="text"
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Giới tính:
                            </label>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Nam"
                                    id="male"
                                    name="gender"
                                    checked={formData.gender === 'Nam'}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="male" className="mr-4">
                                    Nam
                                </label>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Nữ"
                                    id="female"
                                    name="gender"
                                    checked={formData.gender === 'Nữ'}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Loại:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="text"
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Size:
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded p-1"
                                id="Size"
                                name="Size"
                                value={formData.size}
                                onChange={handleSizeChange}
                            >
                                <option value="">Chọn size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Màu:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Mô tả sản phẩm
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded p-1"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Chất liệu:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="text"
                                id="material"
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Hình ảnh:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Số lượng:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="number"
                                id="quantityInStock"
                                name="quantityInStock"
                                min="1"
                                value={formData.quantityInStock}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="roboto-regular">
                                Giá:
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded p-1"
                                type="number"
                                id="price"
                                name="price"
                                min="1"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]"
                        >
                            Cập nhật sản phẩm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default EditProduct;