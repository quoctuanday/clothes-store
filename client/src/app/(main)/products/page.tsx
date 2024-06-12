/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Products } from '@/schema/product';
import Link from 'next/link';
import ProductData from '@/api/Product';
import ReactPaginate from 'react-paginate';

const ProductPage = () => {
    const products = ProductData();
    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    //Category
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
    const [selectedType, setSelectedType] = useState(null);
    const [activeGender, setActiveGender] = useState(null);
    const [activeType, setActiveType] = useState(null);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const onPageChange = (page: any) => {
        setCurrentPage(page.selected + 1);
    };
    useEffect(() => {
        if (selectedCategory && selectedType) {
            // Nếu có danh mục và type được chọn, lọc sản phẩm theo gender và type
            const filtered = products.filter(
                (product) =>
                    product.gender === selectedCategory &&
                    product.type === selectedType
            );
            setFilteredProducts(filtered);
        } else if (selectedCategory) {
            // Nếu chỉ có danh mục được chọn, lọc sản phẩm theo gender
            const filtered = products.filter(
                (product) => product.gender === selectedCategory
            );
            setFilteredProducts(filtered);
        } else {
            // Nếu không có danh mục được chọn, hiển thị tất cả sản phẩm
            setFilteredProducts(products);
        }
    }, [selectedCategory, selectedType, products]);

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
        setSelectedType(null);
        setActiveGender(category);
        setActiveType(null);
    };

    const handleTypeClick = (type: any) => {
        setSelectedType(type);
        setActiveType(type);
    };

    // const handlePageClick = (event: any) => {
    //     console.log(event);
    // };

    return (
        <div>
            <div className="py-[44px] px-[40px] grid grid-cols-4">
                <div className="col-start-2 col-span-3 flex items-center justify-center  text-4xl font-semibold">
                    Sản phẩm
                </div>
            </div>

            <div className="px-[40px] grid grid-cols-4 ">
                <div className="col-span-1 mr-16 bg border-2 w-[236px] rounded h-[300px] ">
                    <ul className="flex items-center  roboto-bold">
                        <li
                            className={`w-[118px] text-center py-2 border-r-2 border-b-2 cursor-pointer ${
                                activeGender === 'Nam'
                                    ? 'bg-[#7000FF] text-white hover:bg-[#7000FF]'
                                    : 'hover:text-white hover:bg-[#7000FF]'
                            }`}
                            onClick={() => handleCategoryClick('Nam')}
                        >
                            Nam
                        </li>
                        <li
                            className={`w-[118px] text-center py-2 border-b-2 cursor-pointer ${
                                activeGender === 'Nữ'
                                    ? 'bg-[#7000FF] text-white hover:bg-[#7000FF]'
                                    : 'hover:text-white hover:bg-[#7000FF]'
                            }`}
                            onClick={() => handleCategoryClick('Nữ')}
                        >
                            Nữ
                        </li>
                    </ul>
                    <ul className="mt-2 roboto-light  ">
                        {Array.from(
                            new Set(
                                products
                                    .filter(
                                        (product) =>
                                            product.gender === selectedCategory
                                    )
                                    .map((product) => product.type)
                            )
                        ).map((type) => (
                            <li
                                className={`pl-[40px] mb-2 cursor-pointer category-item hover:text-[#7000FF] ${
                                    activeType === type ? 'text-[#7000FF]' : ''
                                }`}
                                key={type}
                                onClick={() => handleTypeClick(type)} // Handle click on type
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className=" col-span-3">
                    <ul className="grid grid-cols-4 gap-[20px]">
                        {filteredProducts
                            .slice(
                                (currentPage - 1) * pageSize,
                                currentPage * pageSize
                            )
                            .map((product) => (
                                <li
                                    key={product._id}
                                    className="shadow product-item rounded"
                                >
                                    <Link href={`products/${product._id}`}>
                                        <div className="">
                                            <Image
                                                className="w-full h-[254px]"
                                                src={product.image}
                                                alt="ảnh sản phẩm"
                                                width={254}
                                                height={254}
                                            ></Image>
                                        </div>
                                        <h2 className="my-2 ml-4 w-[236px] line-clamp-1">
                                            {product.productName}
                                        </h2>
                                        <div className="flex items-center justify-between mx-4 mb-2">
                                            <p className="">
                                                {formatCurrency(product.price)}
                                            </p>
                                            <p>
                                                Đã bán: {product.quantitySold}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                    </ul>

                    <ReactPaginate
                        className="flex my-6 items-center justify-center"
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={onPageChange}
                        pageRangeDisplayed={2}
                        pageCount={Math.ceil(
                            filteredProducts.length / pageSize
                        )}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        activeClassName=" text-white bg-[#7000FF]"
                        pageClassName=" rounded mx-2 w-[32px] h-[32px] border flex items-center justify-center hover:text-white  hover:bg-[#7000FF]"
                        pageLinkClassName="page-link"
                        previousClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center  hover:bg-[#7000FF] ${
                            currentPage === 1
                                ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                                : ''
                        }`}
                        previousLinkClassName={`page-link ${
                            currentPage === 1
                                ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                                : ''
                        }`}
                        nextClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center hover:text-white hover:bg-[#7000FF] ${
                            currentPage ===
                            Math.ceil(filteredProducts.length / pageSize)
                                ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                                : ''
                        }`}
                        nextLinkClassName={`page-link ${
                            currentPage ===
                            Math.ceil(filteredProducts.length / pageSize)
                                ? 'cursor-not-allowed pointer-events-none'
                                : ''
                        }`}
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
