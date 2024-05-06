/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
import ProductData from '@/api/Product';

const ProductList = () => {
    const products = ProductData();

    return (
        <div>
            <div className="py-[44px] px-[40px] grid grid-cols-4">
                <div className="col-start-2 col-span-3 flex items-center justify-center  text-4xl font-semibold">
                    Sản phẩm
                </div>
            </div>

            <div className="px-[40px] grid grid-cols-4 ">
                <div className="col-span-1 mr-16 bg-zinc-400">sidebar</div>
                <div className="col-span-3">
                    <ul className="grid grid-cols-4 gap-[20px]">
                        {products.map((product) => (
                            <li key={product._id}>
                                <Link href={`products/${product._id}`}>
                                    <div className="">
                                        <Image
                                            src={product.image}
                                            alt="ảnh sản phẩm"
                                            width={260}
                                            height={428}
                                        ></Image>
                                    </div>
                                    <h2 className="my-2">
                                        {product.productName}
                                    </h2>
                                    <p className="">{product.price} VND</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
