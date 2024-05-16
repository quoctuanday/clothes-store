import React from 'react';
import Image from 'next/image';
import CarouselBanner from '@/components/carousel';
import HotProducts from '@/components/hotproducts';
import HotNews from '@/components/hotnews';

const Homepage = () => {
    return (
        <div className="">
            <div className="flex justify-center ">
                <CarouselBanner />
            </div>
            <div className=" px-10 mt-20">
                <HotProducts />
            </div>
            <div className="px-10 mt-20">
                <HotNews />
            </div>
        </div>
    );
};

export default Homepage;
