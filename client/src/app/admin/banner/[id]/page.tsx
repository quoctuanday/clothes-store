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
                            Tiêu đề:
                        </label>
                        <input
                            className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className=" rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]"
                    >
                        Cập nhật banner
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditBanner;
