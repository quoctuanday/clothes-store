'use client';
import { useEffect, useState } from 'react';
import { News } from '@/schema/news';
import Image from 'next/image';

export default function NewsDetail({ params }: { params: { id: string } }) {
    const [news, setNews] = useState<News | null>(null);

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

    if (!news) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-700">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                    <Image
                        className="rounded-lg shadow-lg w-full h-auto"
                        src={news.image}
                        alt={news.newsName}
                        width={600}
                        height={400}
                        objectFit="cover"
                    />
                    <h2 className="text-2xl md:text-3xl font-bold text-white absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center">
                        {news.newsName}
                    </h2>
                </div>
                <div className="space-y-6">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                        {news.title}
                    </h1>
                    <pre className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {news.content}
                    </pre>
                </div>
            </div>
            <div className="text-sm text-gray-500 mt-8 text-center">
                <span>
                    Ngày đăng: {new Date(news.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}
