'use client';
import { Banners } from '@/schema/banner';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';

function AdminBannerPage() {
    const [banners, setBanner] = useState<Banners[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/banners');
                if (!response.ok) {
                    throw new Error('Failed to fetch banners');
                }
                const data = await response.json();
                if (data && data.banners) {
                    setBanner(data.banners);
                } else {
                    throw new Error('Invalid banners data received');
                }
            } catch (error) {
                console.error('Error fetching banners data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = (bannerID: string) => {
        setSelectedBanner(bannerID);
        setFormVisible(true);
    };

    const handleCloseForm = () => {
        setFormVisible(false);
        setSelectedBanner(null);
    };

    const handleDeleteBanner = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/banners/deleted/${selectedBanner}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            if (!response.ok) {
                throw new Error('Không thể xóa banner ');
            }
            const updatedBanners = banners.filter(
                (banner) => banner._id !== selectedBanner
            );
            setBanner(updatedBanners);
        } catch (error) {
            console.log(error, 'Không thể xoá banner');
        }
        console.log(`Banner had been deleted : ${selectedBanner}`);

        handleCloseForm();
    };

    const pageSize = 5;
    const onPageChange = (page: any) => {
        setCurrentPage(page.selected + 1);
    };

    return (
        <div className="px-2">
            <div className="text-center p-10 roboto-bold text-3xl">Banner</div>
            <Link href="/admin/banner/add-banner">
                <button className="roboto-regular rounded p-2 mb-2 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]">
                    Thêm banner{' '}
                </button>
            </Link>
            <div className="grid grid-cols-8 px-5 roboto-bold gap-3">
                <div className="col-span-1 flex justify-center items-center">
                    Số TT
                </div>
                <div className="col-span-3 flex justify-center items-center">
                    Tiêu đề
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Hình ảnh
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Thao tác
                </div>
            </div>
            {banners
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((banner, index) => (
                    <div className="" key={banner._id}>
                        <div className="grid grid-cols-8 px-5 py-2 roboto-regular gap-3">
                            <div className="col-span-1 flex justify-center items-center">
                                {(currentPage - 1) * pageSize + index + 1}
                            </div>
                            <div className="col-span-3 flex  items-center  line-clamp-2">
                                {banner.title}
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                <Image
                                    className="rounded shadow-md"
                                    src={banner.image}
                                    alt="hinh anh san pham"
                                    width={80}
                                    height={80}
                                ></Image>
                            </div>

                            <div className="col-span-2 flex justify-center items-center">
                                <button className="rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0] mr-2 ">
                                    <Link href={`banner/${banner._id}`}>
                                        <BiPencil />
                                    </Link>
                                </button>
                                <button
                                    className="rounded p-3 hover:bg-[#dc3545] hover:text-[white] border-[1px] border-[#dc3545] text-[#dc3545]"
                                    onClick={() =>
                                        handleDeleteClick(banner._id)
                                    }
                                >
                                    <BiTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            {formVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-2xl mb-4 roboto-bold">
                            Xóa banner
                        </h2>
                        <p className="roboto-thin">
                            Bạn có muốn xóa banner này không?
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={handleCloseForm}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => {
                                    handleDeleteBanner();
                                }}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ReactPaginate
                className="flex my-6  items-center justify-center"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(banners.length / pageSize)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName=" text-white bg-[#7000FF]"
                pageClassName=" rounded mx-2 w-[32px] h-[32px] border flex items-center justify-center hover:text-white  hover:bg-[#7000FF]"
                pageLinkClassName="page-link"
                previousClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center  hover:bg-[#7000FF] ${
                    currentPage === 1
                        ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                previousLinkClassName={`page-link ${
                    currentPage === 1
                        ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                nextClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center hover:text-white hover:bg-[#7000FF] ${
                    currentPage === Math.ceil(banners.length / pageSize)
                        ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                        : ' hover:text-gray-400'
                }`}
                nextLinkClassName={`page-link ${
                    currentPage === Math.ceil(banners.length / pageSize)
                        ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                        : ' hover:text-gray-400'
                }`}
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        </div>
    );
}

export default AdminBannerPage;
