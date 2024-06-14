'use client';
import { fetchNewsData } from '@/api/News';
import { News } from '@/schema/news';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';

function AdminNewsPage() {
    const [mainNews, setMainNews] = useState<News[]>([]);
    const [secondaryNews, setSecondaryNews] = useState<News[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedNews, setSelectedNews] = useState<{ type: string; id: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getNewsData = async () => {
            try {
                const newsData = await fetchNewsData();
                setMainNews(newsData.mainNews);
                setSecondaryNews(newsData.secondaryNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        getNewsData();
    }, []);

    const handleDeleteClick = (type: string, id: string) => {
        setSelectedNews({ type, id });
        setFormVisible(true);
    };

    const handleCloseForm = () => {
        setFormVisible(false);
        setSelectedNews(null);
    };

    const handleDeleteNews = async () => {
        if (!selectedNews) return;
        const { type, id } = selectedNews;
        try {
            const response = await fetch(
                `http://localhost:8000/news/${type}/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            if (!response.ok) {
                throw new Error('Không thể xóa tin tức');
            }
            if (type === 'main') {
                const updatedNews = mainNews.filter((newsItem) => newsItem._id !== id);
                setMainNews(updatedNews);
            } else if (type === 'secondary') {
                const updatedNews = secondaryNews.filter((newsItem) => newsItem._id !== id);
                setSecondaryNews(updatedNews);
            }
        } catch (error) {
            console.log(error, 'Không thể xoá tin tức');
        }
        console.log(`News had been deleted: ${id}`);
    
        handleCloseForm();
    };

    const pageSize = 5;
    const onPageChange = (page: any) => {
        setCurrentPage(page.selected + 1);
    };

    return (
        <div className="px-2">
            <div className="text-center p-8 roboto-bold text-3xl">Tin tức</div>
            <div className="flex justify-center">
                <Link href="/admin/news/add-main-news">
                    <button className="roboto-regular rounded p-2 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0] mr-4">
                        Thêm tin tức chính
                    </button>
                </Link>
                <Link href="/admin/news/add-secondary-news">
                    <button className="roboto-regular rounded p-2 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]">
                        Thêm tin tức phụ
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-12 px-5 roboto-bold gap-3">
                <div className="col-span-1 flex justify-center items-center">
                    Số TT
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Tiêu đề
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Hình ảnh
                </div>
                <div className="col-span-3 flex justify-center items-center">
                    Ngày đăng
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Loại tin
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Thao tác
                </div>
            </div>
            {mainNews.map((mainNews, index) => (
                <div className="" key={mainNews._id}>
                    <div className="grid grid-cols-12 px-5 py-2 roboto-regular gap-3">
                        <div className="col-span-1 flex justify-center items-center">
                            {index + 1}
                        </div>
                        <div className="col-span-2 flex  items-center  line-clamp-2">
                            {mainNews.title}
                        </div>
                        <div className="col-span-2 flex justify-center items-center">
                            <Image
                                className="rounded shadow-md"
                                src={mainNews.image}
                                alt="hinh anh san pham"
                                width={80}
                                height={80}
                            ></Image>
                        </div>
                        <div className="col-span-3 flex justify-center items-center">
                            {new Date(mainNews.createdAt).toLocaleDateString()}
                        </div>
                        <div className="col-span-2 flex justify-center items-center">
                            Tin chính
                        </div>
                        <div className="col-span-2 flex justify-center items-center">
                            <button className="rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0] mr-2 ">
                                <Link href={`/admin/news/${mainNews._id}/main`}>
                                    <BiPencil />
                                </Link>
                            </button>
                            <button
                                className="rounded p-3 hover:bg-[#dc3545] hover:text-[white] border-[1px] border-[#dc3545] text-[#dc3545]"
                                onClick={() => handleDeleteClick('main', mainNews._id)}
                            >
                                <BiTrash />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {secondaryNews
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((secondaryNews, index) => (
                    <div className="" key={secondaryNews._id}>
                        <div className="grid grid-cols-12 px-5 py-2 roboto-regular gap-3">
                            <div className="col-span-1 flex justify-center items-center">
                                {index + (currentPage - 1) * pageSize + 1}
                            </div>
                            <div className="col-span-2 flex items-center line-clamp-2">
                                {secondaryNews.title}
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                <Image
                                    className="rounded shadow-md"
                                    src={secondaryNews.image}
                                    alt="hinh anh san pham"
                                    width={80}
                                    height={80}
                                ></Image>
                            </div>
                            <div className="col-span-3 flex justify-center items-center">
                                {new Date(secondaryNews.createdAt).toLocaleDateString()}
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                Tin phụ
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                <button className="rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0] mr-2">
                                    <Link href={`/admin/news/${secondaryNews._id}/secondary`}>
                                        <BiPencil />
                                    </Link>
                                </button>
                                <button
                                    className="rounded p-3 hover:bg-[#dc3545] hover:text-[white] border-[1px] border-[#dc3545] text-[#dc3545]"
                                    onClick={() => handleDeleteClick('secondary', secondaryNews._id)}
                                >
                                    <BiTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            {formVisible && selectedNews && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-2xl mb-4 roboto-bold">Xóa tin tức</h2>
                        <p className="roboto-thin">Bạn có muốn xóa tin tức này không?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={handleCloseForm}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={handleDeleteNews}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ReactPaginate
                className="flex my-6 items-center justify-center"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(secondaryNews.length / pageSize)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName="text-white bg-[#7000FF]"
                pageClassName="rounded mx-2 w-[32px] h-[32px] border flex items-center justify-center hover:text-white hover:bg-[#7000FF]"
                pageLinkClassName="page-link"
                previousClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center hover:bg-[#7000FF] ${
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
                    currentPage === Math.ceil(secondaryNews.length / pageSize)
                        ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                nextLinkClassName={`page-link ${
                    currentPage === Math.ceil(secondaryNews.length / pageSize)
                        ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        </div>
    );
}

export default AdminNewsPage;
