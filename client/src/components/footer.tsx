'use client';
import React, { useState } from 'react';
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
import emailjs from 'emailjs-com';

function Footer() {
    const products = ProductData();
    const uniqueTypes = Array.from(
        new Set(products.map((product) => product.type))
    );

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Đang gửi...');

        emailjs.send(
            'service_b8sv9l8', // Service ID 
            'template_2ggjwmf', // Template ID
            formData,
            'oWSWSNhtk3A_4rX4x' // User ID
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setStatus('Gửi tin nhắn thành công!');
            setFormData({ name: '', email: '', phone: '', message: '' });
        })
        .catch((error) => {
            console.error('FAILED...', error);
            setStatus('Gửi tin nhắn thất bại. Vui lòng thử lại.');
        });
    };

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
                                        href="mailto:example@email.com"
                                        className="text-gray-800 hover:text-[#7000FF] flex items-center"
                                    >
                                        <MdEmail className="pr-[4px] hover:text-[#7000FF]" />
                                        example@email.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:0987654321"
                                        className="text-gray-800 flex items-center hover:text-[#7000FF]"
                                    >
                                        <FaPhoneAlt className="pr-[4px] pt-[3px] hover:text-[#7000FF]" />
                                        0987 654 321
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
                        <h1 className="roboto-bold text-2xl pb-4">
                            Phản hồi
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Họ tên"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-transparent p-2 w-[300px] focus:outline-none focus:border-[#7000FF] border-b-2 border-[#636161] "
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-transparent p-2 w-[300px] focus:outline-none focus:border-[#7000FF] border-b-2 border-[#636161] "
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="bg-transparent p-2 w-[300px] focus:outline-none focus:border-[#7000FF] border-b-2 border-[#636161] "
                            />
                            <textarea
                                name="message"
                                placeholder="Tin nhắn"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="bg-transparent p-2 w-[300px] focus:outline-none focus:border-[#7000FF] border-b-2 border-[#636161] "
                            ></textarea>
                             <button 
                            type="submit"
                            className="bg-[#333] p-3 px-5 mt-[30px]  uppercase rounded text-white block roboto-regular hover:bg-[#7000FF] hover:text-white"
                            >
                                Subcribe
                            </button>
                        </form>
                        {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
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
                    Copyright © 2024 All rights reserved.
                </span>
            </div>
        </div>
    );
}

export default Footer;
