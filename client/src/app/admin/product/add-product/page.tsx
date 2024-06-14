'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function AddProductPage() {
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const formData = {
                productName: e.target.productName.value,
                branch: e.target.branch.value,
                gender: e.target.gender.value,
                type: e.target.type.value,
                size: e.target.Size.value,
                color: e.target.color.value,
                description: e.target.description.value,
                material: e.target.material.value,
                image: e.target.image.value,
                quantityInStock: parseInt(e.target.quantityInStock.value),
                price: parseInt(e.target.price.value),
            };

            if (
                !formData.productName ||
                !formData.branch ||
                !formData.gender ||
                !formData.type ||
                !formData.size ||
                !formData.color ||
                !formData.description ||
                !formData.material ||
                !formData.image ||
                !formData.quantityInStock ||
                !formData.price
            ) {
                alert('Vui lòng điền đầy đủ thông tin sản phẩm');
                return;
            }
            const response = await fetch(
                'http://localhost:8000/products/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Tạo sản phẩm thành công');
                setTimeout(() => {
                    router.push('/admin/product');
                }, 3000);
            } else {
                alert('Tạo sản phẩm thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi tạo sản phẩm:', error);
        }
    };

    return (
        <div className="px-2">
        <div className="text-center p-10 roboto-bold text-3xl">
            Thêm sản phẩm
        </div>
        <div className="mb-6">
            <Link href="/admin/product">
                <button className="roboto-regular rounded px-4 py-2 border-2 border-[#0dcaf0] text-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-[black] transition duration-300 ease-in-out">
                    Quay lại
                </button>
            </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
                <form
                    className="px-5 col-span-2"
                    onSubmit={handleSubmit}
                >
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
                            />
                        </div>
                        <div className="mb-4 col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]"
                            >
                                Tạo sản phẩm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProductPage;


