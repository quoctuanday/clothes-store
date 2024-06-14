'use client';
import React, { useEffect, useState } from 'react';
import { Banners } from '@/schema/banner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function EditBanner({ params }: { params: { id: string } }) {
    const router = useRouter();

    const [banner, setBanner] = useState<Banners | null>();
    const [formData, setFormData] = useState<Banners>({
        _id: '',
        title: '',
        image: '',
    });

    useEffect(() => {
        const fetchBannerDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/banners/${params.id}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch banner detail');
                }
                const data = await response.json();
                setBanner(data.banner);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBannerDetail();
    }, [params.id]);

    useEffect(() => {
        if (banner) {
            setFormData(banner);
        }
    }, [banner]);

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
        if (!banner?._id) {
            console.log('Banner ID không tồn tại');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8000/banners/update/${banner._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Cập nhật banner thành công');
                setTimeout(() => {
                    router.push('/admin/banner');
                }, 2000);
            } else {
                alert('Cập nhật banner thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Cập nhật banner thất bại');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-8 roboto-bold text-3xl">
                Sửa banner
                </div>
            <div className="flex justify-between mb-4">
                <Link href="/admin/banner">
                    <button className="roboto-regular rounded p-2 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]">
                        Quay lại
                    </button>
                </Link>
            </div>
            <div>
            <form id="addBannerForm" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Tiêu đề:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="title"
                        name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                        value={formData.image}
                        onChange={handleChange}
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
        </div>
    );
}

export default EditBanner;
