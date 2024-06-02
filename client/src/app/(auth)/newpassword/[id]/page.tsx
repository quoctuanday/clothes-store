'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function ResetPasswordPage({ params }: { params: { id: string } }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8000/auth/newpass/${params.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: newPassword,
                    }),
                }
            );

            if (response.ok) {
                alert('Đặt lại mật khẩu thành công');
            } else {
                alert('Đặt lại mật khẩu thất bại');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Đặt lại mật khẩu thất bại');
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Nhập mật khẩu mới</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
                    >
                        Đặt lại mật khẩu
                    </button>
                    <Link className="text-sm mt-3 text-right" href={'/login'}>
                        Bạn đã nhớ lại mật khẩu?
                        <span className="underline"> Đăng nhập</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
