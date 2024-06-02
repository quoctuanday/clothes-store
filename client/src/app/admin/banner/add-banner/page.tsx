'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        <div className="px-2">
            {' '}
            <div className="text-center p-10 roboto-bold text-3xl">
                Thêm banner
            </div>
            <div className="grid grid-cols-4">
                <form
                    className="px-5 col-start-1 col-span-2"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4 grid grid-cols-3">
                        <label className="col-span-1 roboto-regular flex items-center justify-end">
                            Tên banner:
                        </label>
                        <input
                            className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                            type="text"
                            id="title"
                            name="title"
                        />
                    </div>

                    <div className="mb-4 grid grid-cols-3">
                        <label className="col-span-1 roboto-regular flex items-center justify-end">
                            Hình ảnh:
                        </label>
                        <input
                            className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                            type="text"
                            id="image"
                            name="image"
                        />
                    </div>

                    <button
                        type="submit"
                        className=" rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]"
                    >
                        Tạo banner
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBannerPage;
