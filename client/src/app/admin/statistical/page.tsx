'use client';
import { useEffect, useState } from 'react';
import ProductData from '@/api/Product';
import Image from 'next/image';
import { BarChart } from '@/components/barchart';

function AdminStatisticalPage() {
    const products = ProductData();
    const [data, setData] = useState({
        productCount: 0,
        soldCount: 0,
        bannerCount: 0,
        newsCount: 0,
        userCount: 0,
        totalRevenue: 0,
        orderCount: 0,
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
    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };
    const hotProducts = products
        .filter(
            (product) =>
                (product.quantitySold ?? 0) > 0 && product.quantityInStock > 0
        )
        .sort((a, b) => (b.quantitySold ?? 0) - (a.quantitySold ?? 0))
        .slice(0, 5);

    return (
        <div className="px-2">
            <div className="text-center p-10 roboto-bold text-3xl">
                Thống kê
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <div className="grid grid-cols-2 gap-2  ">
                        <div className="rounded col-span-1 bg-[#ffcc80]">
                            <div className="roboto-bold border-b-[1px] border-[#fff] py-3 pl-4">
                                Tổng sản phẩm
                            </div>
                            <div className="roboto-regular py-3 pl-4">
                                {data.productCount}
                            </div>
                        </div>
                        <div className="rounded col-div-1 bg-[#ffd54f]">
                            <div className="roboto-bold border-b-[1px] border-[#fff] py-3 pl-4">
                                Tổng số người dùng
                            </div>
                            <div className="roboto-regular py-3 pl-4">
                                {data.userCount}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 ">
                        <div className="rounded col-span-1 bg-[#eaf789]">
                            <div className="roboto-bold border-b-[1px] border-[#fff] py-3 pl-4">
                                Tổng số tin tức
                            </div>
                            <div className="roboto-regular py-3 pl-4">
                                {data.newsCount}
                            </div>
                        </div>
                        <div className="rounded col-div-1 bg-[#b8c2f0]">
                            <div className="roboto-bold border-b-[1px] border-[#fff] py-3 pl-4">
                                Tổng số banner
                            </div>
                            <div className="roboto-regular py-3 pl-4">
                                {data.bannerCount}
                            </div>
                        </div>
                    </div>
                    <div className="mt-[50px]">
                        <BarChart />
                    </div>
                </div>
                <div className="col-div-1">
                    <div className="grid grid-cols-2 gap-2 ">
                        <div className="rounded col-div-1 bg-[#80c783]">
                            <div className="roboto-bold border-b-[1px] border-[#fff] py-3 pl-4">
                                Tổng doanh thu
                            </div>
                            <div className="roboto-regular py-3 pl-4">
                                {formatCurrency(data.totalRevenue)}
                            </div>
                        </div>
                        <div className="rounded col-div-1 bg-[#90caf8]">
                            <div className="roboto-bold border-b-[1px] border-[#fff] py-3 pl-4">
                                Tổng số đơn hàng - Đã thanh toán
                            </div>
                            <div className="roboto-regular py-3 pl-4">
                                {data.orderCount}
                            </div>
                        </div>
                    </div>
                    <div className="rounded bg-[#c4b0e7] mt-2 overflow-y-scroll max-h-[638px] no-scrollbar">
                        <div className="roboto-bold border-b-[1px] border-[#fff] py-3 pl-4 ">
                            Top sản phẩm bán chạy nhất
                        </div>
                        {hotProducts.map((item) => (
                            <div
                                className="bg-white rounded mx-4 my-3"
                                key={item._id}
                            >
                                <div className="py-3 pl-4">
                                    {item.productName}
                                </div>
                                <div className="grid grid-cols-3 py-3 pl-4">
                                    <div className="col-span-1">
                                        <Image
                                            className="rounded"
                                            src={item.image}
                                            alt="anh san pham"
                                            width={60}
                                            height={60}
                                        ></Image>
                                    </div>
                                    <div className="col-span-1">
                                        <span className="roboto-bold">
                                            Đã bán:{' '}
                                        </span>
                                        <span className="roboto-regular">
                                            {item.quantitySold}
                                        </span>
                                    </div>
                                    <div className="col-span-1">
                                        <span className="roboto-bold">
                                            Tổng doanh thu:{' '}
                                        </span>
                                        <span className="roboto-regular">
                                            {formatCurrency(
                                                item.quantitySold * item.price
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminStatisticalPage;
