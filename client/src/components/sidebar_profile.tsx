'use client';
import UserLoginData, { clearUserData } from '@/api/UserLogin';

import Link from 'next/link';
import { CiUser } from 'react-icons/ci';
import { RiBillLine } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';

function SidebarProfile() {
    const user = UserLoginData();
    const handleLogout = () => {
        document.cookie =
            'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        clearUserData(); // Clear user data
    };

    return (
        <div>
            {user ? (
                <>
                    <div className="flex items-center justify-start p-5">
                        <div
                            className="rounded-full bg-cover bg-center w-20 h-20 bg-white border-2 border-white"
                            style={{
                                backgroundImage: `url('${user.image}')`,
                            }}
                        ></div>

                        <span className="ml-4 roboto-bold text-xl text-red">
                            {user.userName}
                        </span>
                    </div>
                    <ul className="px-5">
                        <li className="flex items-center category-item">
                            <div>
                                <CiUser />
                            </div>
                            <Link
                                href={'/profile'}
                                className="p-3 block roboto-regular text-xl"
                            >
                                Tài khoản của tôi
                            </Link>
                        </li>
                        <li className="flex items-center category-item">
                            <div>
                                <FiShoppingCart />
                            </div>
                            <Link
                                href={'/cart'}
                                className="p-3 block roboto-regular text-xl"
                            >
                                Giỏ hàng
                            </Link>
                        </li>
                        <li className="flex items-center category-item">
                            <div>
                                <RiBillLine />
                            </div>
                            <Link
                                href={'/order'}
                                className="p-3 block roboto-regular text-xl"
                            >
                                Đơn mua
                            </Link>
                        </li>
                        <li className="flex items-center category-item">
                            <div>
                                <IoIosLogOut />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-3 block roboto-regular text-xl"
                            >
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <p>Bạn chưa đăng nhập</p>
                </>
            )}
        </div>
    );
}

export default SidebarProfile;
