'use client';
import React, { useEffect, useState } from 'react';
import { News } from '@/schema/news';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function EditNews({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [news, setNews] = useState<News | null>(null);
    const [formData, setFormData] = useState<Partial<News>>({
        _id: '',
        title: '',
        image: '',
        content: '',
        newsName: '',
});

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/news/${params.id}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch news detail');
                }
                const data = await response.json();
                setNews(data.news);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNewsDetail();
    }, [params.id]);

    useEffect(() => {
        if (news) {
            setFormData(news);
        }
    }, [news]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData._id) {
            alert('News ID không tồn tại');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8000/news/edit-secondary-news/${formData._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Cập nhật tin tức thành công');
                setTimeout(() => {
                    router.push('/admin/news');
                }, 2000);
            } else {
                alert('Cập nhật tin tức thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Cập nhật tin tức thất bại');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Chỉnh sửa Tin Tức</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung</label>
                        <textarea id="content" name="content" value={formData.content} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <div>
                        <label htmlFor="newsName" className="block text-sm font-medium text-gray-700">Tên</label>
                        <input type="text" id="newsName" name="newsName" value={formData.newsName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out p-2" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out">
                        Cập nhật tin tức
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditNews;
