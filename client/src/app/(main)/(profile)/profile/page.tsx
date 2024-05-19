'use client';
import React from 'react';
import UserLoginData from '@/api/UserLogin';
import Image from 'next/image';
import { HiPencilSquare } from 'react-icons/hi2';
import Link from 'next/link';

function ProfilePage() {
    const user = UserLoginData();
    return (
        <div className="p-5">
            <h1 className="capitalize roboto-bold text-2xl mb-2">
                Thông tin cá nhân
            </h1>
            <Link
                href={'/editProfile'}
                className="flex items-center justify-start mb-5"
            >
                Sửa hồ sơ: <HiPencilSquare />
            </Link>
            {user ? (
                <>
                    <div className="grid grid-cols-9 gap-10">
                        <div className="col-span-6 ">
                            <div className="roboto-regular mb-3 ml-10">
                                Tên đăng nhập: {user.userName}
                            </div>

                            <div className="roboto-regular mb-3 ml-10">
                                Họ và tên: {user.fullName}
                            </div>

                            <div className="roboto-regular mb-3 ml-10">
                                Giới tính: {user.gender}
                            </div>
                            <div className="roboto-regular mb-3 ml-10">
                                Email: {user.email}
                            </div>
                            <div className="roboto-regular mb-3 ml-10">
                                Số điện thoại: {user.phone}
                            </div>
                            <div className="roboto-regular mb-3 ml-10">
                                Địa chỉ: {user.address}
                            </div>
                        </div>
                        <div className="col-span-3 ">
                            <div className=" flex items-center justify-center">
                                <Image
                                    className="rounded over"
                                    src={user.image}
                                    alt="User image"
                                    objectFit="cover"
                                    width={200}
                                    height={200}
                                ></Image>
                            </div>
                            <h1 className="text-center roboto-regular text-xl">
                                Avatar
                            </h1>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1>Chưa đăng nhập</h1>
                </>
            )}
        </div>
    );
}

export default ProfilePage;
