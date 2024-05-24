'use client';
import { useEffect, useState } from 'react';
import { fetchNewsData } from '@/api/News';
import Link from 'next/link';
import Image from 'next/image';
import { News } from '@/schema/news';
import { motion } from 'framer-motion';

function HotNews() {
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchNewsData();
            setNews(data.secondaryNews);
        }
        fetchData();
    }, []);

    const hotNews = news
        .map((newsItem) => ({
            ...newsItem,
            createdAt: new Date(newsItem.createdAt), // Ensure createdAt is a Date object
        }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // Sort by createdAt in descending order
        .slice(0, 4);
    return (
        <div>
            <div className="text-center roboto-bold text-4xl">
                Tin tức mới nhất
            </div>
            <div className="grid grid-cols-4 gap-[20px] mt-10">
                {hotNews.map((news) => (
                    <motion.div
                        key={news._id}
                        className="shadow-lg news-item rounded overflow-hidden mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href={`/news/${news._id}`}>
                            <div className="relative group">
                                <span className="absolute top-0 left-0 bg-[#7000FF] p-2 text-white roboto-regular text-xs rounded-br rounded-t">
                                    Latest news
                                </span>
                                <Image
                                    className="w-full h-64 object-cover"
                                    src={news.image}
                                    alt="news image"
                                    width={300}
                                    height={300}
                                ></Image>
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    <h2 className="text-white text-xl font-bold text-center px-2">
                                        {news.title}
                                    </h2>
                                </div>
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                    {news.newsName}
                                </h3>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default HotNews;
