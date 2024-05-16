'use client';
import React from 'react';
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhoneAlt,
    FaYoutube,
} from 'react-icons/fa';
import ProductData from '@/api/Product';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';

function Footer() {
    const products = ProductData();
    const uniqueTypes = Array.from(
        new Set(products.map((product) => product.type))
    );

    return (
        <div>
            <div className="h-[435px] bg-gray-300 mt-20">
                <div className="pt-20 px-10 grid grid-cols-6 gap-5">
                    <div className="col-span-2">
                        <h1 className="roboto-bold text-2xl">
                            Thông tin liên hệ
                        </h1>
                        <div className="py-[30px]">
                            <h1 className="roboto-bold">
                                Mọi thông tin chi tiết xin liên hệ:
                            </h1>
                            <ul className=" ">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-800 hover:text-[#7000FF] flex items-center"
                                    >
                                        <MdEmail className="pr-[4px] hover:text-[#7000FF]" />
                                        0987 654 321
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-800 flex items-center hover:text-[#7000FF]"
                                    >
                                        <FaPhoneAlt className="pr-[4px] pt-[3px] hover:text-[#7000FF]" />
                                        example@email.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mb-1 roboto-bold">
                            Tương tác với chúng tôi tại:
                        </div>
                        <ul className="flex space-x-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-black"
                                >
                                    <FaFacebook className="hover:text-[#7000FF]" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-black"
                                >
                                    <FaYoutube className="hover:text-[#7000FF]" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-black"
                                >
                                    <FaLinkedin className="hover:text-[#7000FF]" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-black"
                                >
                                    <FaInstagram className="hover:text-[#7000FF]" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h1 className="roboto-bold text-2xl pb-[30px]">
                            Danh mục
                        </h1>
                        {uniqueTypes.map((type, index) => (
                            <div
                                key={index}
                                className="category-item cursor-pointer hover:text-[#7000FF] roboto-regular mb-2"
                            >
                                <div>{type}</div>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-1">
                        <h1 className="roboto-bold text-2xl pb-[30px]">
                            Links
                        </h1>
                        <ul>
                            <li className="mb-2 roboto-regular category-item hover:text-[#7000FF]">
                                <a href="/news">Tin tức</a>
                            </li>
                            <li className="mb-2 roboto-regular category-item hover:text-[#7000FF]">
                                <a href="/introduce">Về chúng tôi</a>
                            </li>
                            <li className="mb-2 roboto-regular category-item hover:text-[#7000FF]">
                                <a href="/contact">Liên hệ</a>
                            </li>
                            <li className="mb-2 roboto-regular category-item hover:text-[#7000FF]">
                                <a href="#">Trở lại </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-2">
                        <h1 className="roboto-bold text-2xl pb-[30px]">
                            Phản hồi
                        </h1>
                        <form action="">
                            <input
                                type="email"
                                placeholder="example@.gmail.com"
                                className="bg-transparent p-2 w-[300px] focus:outline-none focus:border-[#7000FF] border-b-2 border-[#636161] "
                            />
                            <button className="bg-[#333] p-3 px-5 mt-[30px]  uppercase rounded text-white block roboto-regular hover:bg-[#7000FF] hover:text-white">
                                Subcribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex items-center justify-center max-h-[100px] overflow-hidden">
                    <Image
                        className="h-200px] w-[200px] "
                        src={'https://iili.io/J6Pj5S2.png'}
                        alt="ảnh"
                        width={300}
                        height={300}
                    ></Image>
                </div>
                <span className="block text-center">
                    Copyright © 2019 All rights reserved.
                </span>
            </div>
        </div>
    );
}

export default Footer;
