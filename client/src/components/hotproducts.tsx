'use client';
import React from 'react';
import ProductData from '@/api/Product';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

function HotProducts() {
    const products = ProductData();
    const hotProducts = products
        .filter(
            (product) =>
                (product.quantitySold ?? 0) > 0 && product.quantityInStock > 0
        )
        .sort((a, b) => (b.quantitySold ?? 0) - (a.quantitySold ?? 0))
        .slice(0, 5);
    return (
        <div>
            <div className="text-center roboto-bold text-4xl">
                Sản phẩm được bán chạy
            </div>
            <div className="grid grid-cols-5 gap-[20px] mt-10">
                {hotProducts.map((product) => (
                    <motion.div
                        key={product._id}
                        className="col-span-1 shadow product-item rounded relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href={`products/${product._id}`}>
                            <span className="absolute top-0 left-0 bg-[#7000FF] p-2 text-white roboto-regular text-xs rounded-br rounded-t">
                                Top selling
                            </span>
                            <Image
                                className="w-full h-[254px]"
                                src={product.image}
                                alt="anh san pham"
                                width={254}
                                height={254}
                            ></Image>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default HotProducts;
