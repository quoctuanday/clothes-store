'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function AddBannerPage() {
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const formData = {
                title: e.target.title.value,
                image: e.target.image.value,
            };

            if (!formData.title || !formData.image) {
                alert('Vui lòng điền đầy đủ thông tin banner');
                return;
            }
            const response = await fetch(
                'http://localhost:8000/banners/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Tạo banner thành công');
                setTimeout(() => {
                    router.push('/admin/banner');
                }, 3000);
            } else {
                alert('Tạo banner thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi tạo banner:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-8 roboto-bold text-3xl">
                Thêm banner
            </div>
            <div className="flex justify-between mb-4">
                <Link href="/admin/banner">
                    <button className="roboto-regular rounded p-2 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]">
                        Quay lại
                    </button>
                </Link>
            </div>
            <form id="addBannerForm" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Tên banner:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="title"
                        name="title"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Hình ảnh:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="image"
                        name="image"
                    />
                </div>
                
                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="bg-[#0dcaf0] hover:bg-[#0bb8d9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Tạo banner
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBannerPage;