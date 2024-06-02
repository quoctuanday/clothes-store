'use client';
import React from 'react';
import UserLoginData from '@/api/UserLogin';
import Image from 'next/image';
import { FaCube, FaRegNewspaper, FaUserAlt } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import { IoMdHome } from 'react-icons/io';

function SidebarAdmin() {
    const user = UserLoginData();
    return (
        <div>
            {user ? (
                <>
                    <div className="bg-[#05083c] text-white h-screen uppercase pt-5 pl-4">
                        <div className="flex items-center py-2">
                            <div className="w-15 h-15 rounded-full bg-cover bg-no-repeat bg-center">
                                <Image
                                    className="rounded-full"
                                    src={user.image}
                                    alt="avt"
                                    width={60}
                                    height={60}
                                ></Image>
                            </div>
                            <div className="ml-2 roboto-bold">
                                {user?.userName}
                            </div>
                        </div>

                        <ul className="mt-7 list-none p-0">
                            <li className="my-2.5">
                                <a
                                    href="/admin/home"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <IoMdHome />
                                    </div>
                                    <div>Trang chủ</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/customer"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <FaUserAlt />
                                    </div>
                                    <div>Khách hàng</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/product"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <FaCube />
                                    </div>
                                    <div>Sản phẩm</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/banner"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <HiSpeakerphone />
                                    </div>
                                    <div>Banners</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/news"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <FaRegNewspaper />
                                    </div>
                                    <div>Quản lý tin tức</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-[#05083c] text-white h-screen uppercase pt-5 pl-4">
                        <div className="flex items-center py-2">
                            <div className="w-[60px] h-[60px] bg-slate-200 rounded-full bg-cover bg-no-repeat bg-center"></div>
                            <div className="ml-2 roboto-bold"></div>
                        </div>

                        <ul className="mt-7 list-none p-0">
                            <li className="my-2.5">
                                <a
                                    href="/admin/home"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <IoMdHome />
                                    </div>
                                    <div>Trang chủ</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/customer"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <FaUserAlt />
                                    </div>
                                    <div>Khách hàng</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/product"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <FaCube />
                                    </div>
                                    <div>Sản phẩm</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/banner"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <HiSpeakerphone />
                                    </div>
                                    <div>Banners</div>
                                </a>
                            </li>
                            <li className="my-2.5">
                                <a
                                    href="/admin/news"
                                    className="flex items-center roboto-regular text-white no-underline"
                                >
                                    <div className="text-white mr-2.5 ml-5">
                                        <FaRegNewspaper />
                                    </div>
                                    <div>Quản lý tin tức</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default SidebarAdmin;
