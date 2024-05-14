'use client';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import ProductData from '@/api/Product';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

export default function SearchInput() {
    const products = ProductData();

    const [query, setQuery] = useState('');

    const fuse = new Fuse(products, {
        keys: ['productName', 'gender', 'type'],
        includeScore: true,
    });

    const results = fuse.search(query);

    function handleOnSearch({
        currentTarget,
    }: React.ChangeEvent<HTMLInputElement>) {
        const { value } = currentTarget;
        setQuery(value);
    }

    function matchAllWords(item: any, words: string[]) {
        return words.every((word) => {
            return ['productName', 'gender', 'type'].some((key) => {
                const fieldValue = String(item[key]).toLowerCase();
                return fieldValue.includes(word);
            });
        });
    }

    const productResults =
        query.trim() === ''
            ? []
            : fuse
                  .search(query)
                  .map((result) => result.item)
                  .filter((item) =>
                      matchAllWords(item, query.toLowerCase().split(' '))
                  );

    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="max-w-[524px] rounded "
                value={query}
                onChange={handleOnSearch}
            />
            <div className="absolute top-9 rounded right-0 left-0 max-w-[524px] max-h-[360px] overflow-y-scroll  shadow-sm bg-white">
                <ul className="">
                    {productResults.map((product) => (
                        <li key={product._id}>
                            <Link
                                href="/products/[id]"
                                as={`/products/${product._id}`}
                                className=" flex items-center justify-start ml-2 my-1 "
                                onClick={() => setQuery('')}
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
