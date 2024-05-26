'use client';
import SearchInput from '@/components/search_input';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhoneAlt,
    FaShoppingCart,
    FaUser,
    FaYoutube,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Header() {
    const [cartItemCount, setCartItemCount] = useState(0);
    useEffect(() => {
        const cartItemCount = localStorage.getItem('cartItemCount');
        if (cartItemCount !== null) {
            setCartItemCount(parseInt(cartItemCount));
        }
    }, []);
    return (
        <div>
            <nav className="bg-gray-300 h-10 w-full flex items-center justify-between px-[40px]">
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="text-gray-800 hover:text-black">
                            <FaFacebook className="hover:text-[#7000FF]" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-800 hover:text-black">
                            <FaYoutube className="hover:text-[#7000FF]" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-800 hover:text-black">
                            <FaLinkedin className="hover:text-[#7000FF]" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-800 hover:text-black">
                            <FaInstagram className="hover:text-[#7000FF]" />
                        </a>
                    </li>
                </ul>

                <ul className="flex space-x-4">
                    <li>
                        <a
                            href="mailto:example@gmail.com"
                            className="text-gray-800 hover:text-[#7000FF] flex items-center"
                        >
                            <MdEmail className="pr-[4px] pt-[3px] hover:text-[#7000FF]" />
                            example@email.com
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-800 flex items-center hover:text-[#7000FF]"
                        >
                            <FaPhoneAlt className="pr-[4px] pt-[3px] hover:text-[#7000FF]" />
                            0987 654 321
                        </a>
                    </li>
                </ul>
            </nav>
            <nav className="bg-[#FFFDF5] h-20 w-full flex items-center justify-between px-[40px] shadow">
                <div className="text-xl font-bold">
                    <Link href="/home">
                        <Image
                            src="/images/logo.png"
                            alt=""
                            width={80}
                            height={80}
                        />
                    </Link>
                </div>

                <ul className="flex space-x-4">
                    <li>
                        <Link
                            href="/home"
                            className="text-gray-800 hover:text-[#7000FF] font-bold"
                        >
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            className="text-gray-800 hover:text-[#7000FF] font-bold"
                        >
                            Sản phẩm
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/news"
                            className="text-gray-800 hover:text-[#7000FF] font-bold"
                        >
                            Tin tức
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/introduce"
                            className="text-gray-800 hover:text-[#7000FF] font-bold"
                        >
                            Về chúng tôi
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="text-gray-800 hover:text-[#7000FF] font-bold"
                        >
                            Liên hệ
                        </Link>
                    </li>
                </ul>

                <div className="w-[524px]">
                    <SearchInput />
                </div>

                <div className="flex items-center">
                    {' '}
                    <Link href="/profile">
                        <div className="mr-[16px] hover:text-[#7000FF]">
                            <FaUser />
                        </div>
                    </Link>
                    <Link href="/cart">
                        <div className="hover:text-[#7000FF] relative">
                            <FaShoppingCart />
                            <div className="absolute bottom-[10px] right-[-4px] rounded-full bg-[#71b9f4] text-white px-1 text-[8px] ">
                                {cartItemCount}
                            </div>
                        </div>
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;
