/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { fetchNewsData } from '@/api/News';
import { News } from '@/schema/news';

const NewsPage = () => {
    const [mainNews, setMainNews] = useState<News[]>([]);
    const [secondaryNews, setSecondaryNews] = useState<News[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

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

    const onPageChange = (page: any) => {
        setCurrentPage(page.selected + 1);
    };

    const displayNews = (news: News[]) => {
        return news
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map(item => (
                <li key={item._id} className="shadow-lg news-item rounded-lg overflow-hidden mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <Link href={`/news/${item._id}`}>
                        <div className="relative group">
                            <img
                                className="w-full h-64 object-cover"
                                src={item.image}
                                alt="news image"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <h2 className="text-white text-xl font-bold text-center px-2">{item.title}</h2>
                            </div>
                        </div>
                        <div className="p-4 bg-white">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.newsName}</h3>
                        </div>
                    </Link>
                </li>
            ));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Tin tức chính */}
            {mainNews.length > 0 && (
                <div className="mb-12">
                    <Link href={`/products`}>
                        <div className="relative cursor-pointer group">
                            <img
                                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                                src={mainNews[0].image}
                                alt={mainNews[0].newsName}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg">
                                <h1 className="text-white text-4xl font-bold p-4 text-center">{mainNews[0].title}</h1>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Các tin tức phụ */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayNews(secondaryNews)}
            </ul>

            {/* Phân trang */}
            <ReactPaginate
                className="flex my-6 items-center justify-center space-x-2"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={2}
                pageCount={Math.ceil((mainNews.length + secondaryNews.length) / pageSize)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName="bg-blue-500 text-white"
                pageClassName="rounded-full w-10 h-10 border flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
                previousClassName={`rounded-full w-10 h-10 border flex items-center justify-center hover:bg-blue-500 hover:text-white transition ${
                    currentPage === 1 ? 'cursor-not-allowed text-gray-400' : ''
                }`}
                previousLinkClassName={`page-link ${
                    currentPage === 1 ? 'pointer-events-none' : ''
                }`}
                nextClassName={`rounded-full w-10 h-10 border flex items-center justify-center hover:bg-blue-500 hover:text-white transition ${
                    currentPage === Math.ceil((mainNews.length + secondaryNews.length) / pageSize) ? 'cursor-not-allowed text-gray-400' : ''
                }`}
                nextLinkClassName={`page-link ${
                    currentPage === Math.ceil((mainNews.length + secondaryNews.length) / pageSize) ? 'pointer-events-none' : ''
                }`}
                breakClassName="rounded-full w-10 h-10 border flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
                breakLinkClassName="page-link"
            />
        </div>
    );
};

export default NewsPage;
