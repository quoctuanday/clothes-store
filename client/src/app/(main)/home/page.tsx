import React from 'react';
import Image from 'next/image';
import CarouselBanner from '@/components/carousel';

const Homepage = () => {
    return (
        <div className="">
            <div className="flex justify-center ">
                <CarouselBanner />
            </div>
        </div>
    );
};

export default Homepage;
