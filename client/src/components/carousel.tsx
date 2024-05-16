'use client';
import { useState, useEffect } from 'react';
import BannerData from '@/api/Banner';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function CarouselBanner() {
    const banners = BannerData();

    return (
        <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            interval={5000}
            infiniteLoop={true}
        >
            {banners.map((item, idx) => (
                <div key={idx} className="relative">
                    <Image
                        src={item.image}
                        alt="slides"
                        width={1000}
                        height={500}
                    />
                    <div className="absolute top-[70%] left-20">
                        <h3 className="max-w-[500px] roboto-bold uppercase text-left text-xl  text-black hover:text-[#45a7ce] cursor-pointer">
                            {item.title}
                        </h3>
                        <button className="rounded flex items-center justify-center h-8 p-2 mt-5 bg-[#6366f1] text-white roboto-regular">
                            <a href="#">Visit Docs</a>
                        </button>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

export default CarouselBanner;
