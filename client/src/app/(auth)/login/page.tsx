'use client';
import { useEffect, useState } from 'react';
import { Users } from '@/schema/user';
import Link from 'next/link';

function LoginPage() {
    const [error, setError] = useState('');
    const [user, setUser] = useState<Users | null>(null); // Thay đổi kiểu dữ liệu thành `Users | null`
    const [fields, setFields] = useState({
        email: '',
        password: '',
    });

    const setFieldValue = (e: any) => {
        const { name, value } = e.target;
        setFields((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
        setError('');
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(fields),
        })
            .then((res) => {
                if (res.ok) return res.json();
                throw Error(res.statusText);
            })
            .then((user) => {
                console.log(user);
                setUser(user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetch('http://localhost:8000/auth/login/me', {
            credentials: 'include',
        }).then((res) =>
            res.json().then((me) => {
                setUser(me);
            })
        );
    }, []);
    const handleLogout = () => {
        document.cookie =
            'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null); // Cập nhật trạng thái người dùng
    };

    return (
        <div className="my-20 ml-20">
            {user ? (
                <>
                    <p>
                        Xin chao, {user.userName} {user.fullName}
                    </p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                <div className='grid place-items-center h-screen'>
                    <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                    <h1 className='text-xl font-bold my-4'>Nhập thông tin</h1>
                    <form className='flex flex-col gap-3'>
                    <input type="text" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Đăng nhập
                    </button>
                    <Link className="text-sm mt-3 text-right "href={'/signin'}>Không có tài khoản?<span className='underline'>Đăng ký</span></Link>
                    
                    </form>
                
                </div>
                </div>
                </>
            )}
        </div>
    );
}

export default LoginPage;
