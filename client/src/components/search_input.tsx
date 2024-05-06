'use client';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import ProductData from '@/api/Product';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchInput() {
    const products = ProductData();

    const [query, setQuery] = useState('');

    const fuse = new Fuse(products, {
        keys: ['productName'],
        includeScore: true,
    });

    const results = fuse.search(query);
    console.log('result', results);
    const productResults = results.map((result) => result.item);

    function handleOnSearch({
        currentTarget,
    }: React.ChangeEvent<HTMLInputElement>) {
        const { value } = currentTarget;
        setQuery(value);
    }

    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="max-w-[524px] rounded "
                value={query}
                onChange={handleOnSearch}
            />
            <div className="absolute top-9 rounded right-0 left-0 max-w-[524px]  shadow-sm bg-white">
                <ul className="">
                    {productResults.map((product) => (
                        <li key={product._id}>
                            <Link
                                href={`products/${product._id}`}
                                className=" flex items-center justify-start ml-2 my-1 "
                            >
                                <div className="">
                                    <Image
                                        src={product.image}
                                        alt="ảnh sản phẩm"
                                        width={30}
                                        height={30}
                                    ></Image>
                                </div>
                                <h2 className="ml-2 my-2">
                                    {product.productName}
                                </h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <FaSearch className="absolute top-[10px] right-[8px] hover:text-[#7000FF]" /> */}
        </div>
    );
}
