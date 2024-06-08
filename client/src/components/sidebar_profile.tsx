'use client';
import UserLoginData, { clearUserData } from '@/api/UserLogin';

import Link from 'next/link';
import { CiUser } from 'react-icons/ci';
import { RiBillLine } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdDashboard } from 'react-icons/md';

function SidebarProfile() {
    const router = useRouter();
    const [logoutMessage, setLogoutMessage] = useState('');
    const user = UserLoginData();
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Đảm bảo cookie được gửi đi
            });

            if (response.ok) {
                const data = await response.json();
                setLogoutMessage(data.message);
                clearUserData(); // Clear user data
                localStorage.clear();
            } else {
                throw new Error('Đăng xuất thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi đăng xuất');
        }
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
                        {user.role === 'Admin' && (
                            <li className="flex items-center category-item">
                                <div>
                                    <MdDashboard />
                                </div>
                                <Link
                                    href={'/admin/home'}
                                    className="p-3 block roboto-regular text-xl"
                                >
                                    Admin dashboard
                                </Link>
                            </li>
                        )}
                        <li className="flex items-center category-item">
                            <div>
                                <IoIosLogOut />
                            </div>
                            <a href="/login">
                                <button
                                    onClick={handleLogout}
                                    className="p-3 block roboto-regular text-xl"
                                >
                                    Đăng xuất
                                </button>
                            </a>
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
