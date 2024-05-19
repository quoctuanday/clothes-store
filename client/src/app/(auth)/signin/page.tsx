"use client"

import React, { useState } from 'react';
import Link from 'next/link';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e:any) => {
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
                    password
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
        <div className='grid place-items-center h-screen'>
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className='text-xl font-bold my-4'>Nhập thông tin</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Đăng ký
                    </button>
                    <Link className="text-sm mt-3 text-right "href={'/login'}>Đã có tài khoản?<span className='underline'>Đăng nhập</span></Link>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;
