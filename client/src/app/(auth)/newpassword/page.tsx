'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            // Gửi yêu cầu POST tới endpoint /register
            const response = await fetch('http://localhost:8000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    userName,
                    password,
                }),
            });

            if (response.ok) {
                alert('User registered successfully');
            } else {
                alert('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to register user');
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Nhập mật khẩu mới</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  
                    <input
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
                        type="text"
                        placeholder="Mật khẩu mới"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
                    >
                        Reset password
                    </button>
                    <Link className="text-sm mt-3 text-right " href={'/login'}>
                        Bạn đã nhớ lại mật khẩu?
                        <span className="underline"> Đăng nhập</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;
