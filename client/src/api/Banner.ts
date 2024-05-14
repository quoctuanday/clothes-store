'use client';
import { useEffect, useState } from 'react';
import { Banners } from '@/schema/banner';

export default function BannerData() {
    const [banners, setBanners] = useState<Banners[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/banners');
                if (!response.ok) {
                    throw new Error('Failed to fetch banners');
                }
                const data = await response.json();
                setBanners(data.banners);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return banners;
}
