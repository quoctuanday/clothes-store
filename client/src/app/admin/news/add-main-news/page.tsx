'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AddNewsPage = () => {
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const formData = {
                title: e.target.title.value,
                image: e.target.image.value,
                content: e.target.content.value,
                newsName: e.target.newsName.value,
            };

            if (!formData.title || !formData.image || !formData.content || !formData.newsName) {
                alert('Vui lòng điền đầy đủ thông tin tin tức');
                return;
            }

            const response = await fetch('http://localhost:8000/news/store-main-news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Tạo tin tức thành công');
                setTimeout(() => {
                    router.push('/admin/news');
                }, 3000);
            } else {
                alert('Tạo tin tức thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi tạo tin tức:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Thêm Tin Tức Chính</h1>
                </div>
                <Link href="/admin/news" className="inline-block mb-6 text-blue-500 hover:text-blue-700">
                    Quay lại
                </Link>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input type="text" id="title" name="title" className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                        <input type="text" id="image" name="image" className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung</label>
                        <textarea id="content" name="content" className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <div>
                        <label htmlFor="newsName" className="block text-sm font-medium text-gray-700">Tên</label>
                        <input type="text" id="newsName" name="newsName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out">
                        Tạo tin tức
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewsPage;
