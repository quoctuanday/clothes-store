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
                Loading...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 gap-5">
            <div className="relative">
                <h2 className="text-3xl font-bold text-white absolute top-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center">
                    {news.newsName}
                </h2>
                <div className="flex justify-center items-center">
                    <Image
                        className="rounded-lg shadow-lg  w-[100%]"
                        src={news.image}
                        alt={news.newsName}
                        width={600}
                        height={400}
                        objectFit="cover"
                    />
                </div>
            </div>
            <div className="space-y-6 mt-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    {news.title}
                </h1>
                <p className="text-lg text-gray-600">{news.content}</p>
                <div className="text-sm text-gray-500">
                    <span>
                        Published on:{' '}
                        {new Date(news.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
