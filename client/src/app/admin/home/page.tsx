'use client';
import { useState, useEffect } from 'react';

function AdminPage() {
    const [data, setData] = useState({
        productCount: 0,
        soldCount: 0,
        bannerCount: 0,
        newsCount: 0,
        userCount: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8000/admin/', {
                    credentials: 'include',
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="container mx-auto">
                <div className="text-3xl text-center roboto-bold py-10">
                    Trang chủ
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-around w-full max-w-3xl h-32  box-shadow rounded p-9 mx-auto mb-5">
                        <div className="text-center">
                            <div className="roboto-regular text-xl">
                                Sản phẩm
                            </div>
                            <div className="roboto-regular text-xl">
                                {data.productCount}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="roboto-regular text-xl">Đã bán</div>
                            <div className="roboto-regular text-xl">
                                {data.soldCount}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-around w-full max-w-3xl h-32  box-shadow rounded p-9 mx-auto mb-5">
                        <div className="text-center">
                            <div className="roboto-regular text-xl">Banner</div>
                            <div className="roboto-regular text-xl">
                                {data.bannerCount}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="roboto-regular text-xl">News</div>
                            <div className="roboto-regular text-xl">
                                {data.newsCount}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-around w-full max-w-3xl h-32  box-shadow rounded p-9 mx-auto mb-5">
                        <div className="text-center">
                            <div className="roboto-regular text-xl">User</div>
                            <div className="roboto-regular text-xl">
                                {data.userCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
