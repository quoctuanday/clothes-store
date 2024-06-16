'use client';
import { useState, useEffect } from 'react';
import BannerData from '@/api/Banner';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
                <motion.div
                    key={idx}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                    <Image
                        src={item.image}
                        alt="slides"
                        width={1000}
                        height={500}
                    />
                    <motion.div
                        className="absolute top-[70%] left-20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3 className="max-w-[500px] roboto-bold uppercase text-left text-xl  text-black hover:text-[#45a7ce] cursor-pointer">
                            {item.title}
                        </h3>
                    </motion.div>
                </motion.div>
            ))}
        </Carousel>
    );
}

export default CarouselBanner;
