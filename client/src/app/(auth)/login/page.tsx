'use client';
import { useEffect, useState } from 'react';
import { Users } from '@/schema/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
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
                setUser(user);
                // localStorage.setItem('isLogin', true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // useEffect(() => {
    //     fetch('http://localhost:8000/auth/login/me', {
    //         credentials: 'include',
    //     }).then((res) =>
    //         res.json().then((me) => {
    //             setUser(me);
    //         })
    //     );
    // }, []);

    useEffect(() => {
        if (user) {
            router.push('/home');
        }
    }, [user, router]);
    const handleLogout = () => {
        document.cookie =
            'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null);
    };

    return (
        <div className="">
            <form onSubmit={handleLogin}>
                <div className="grid place-items-center h-screen">
                    <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                        <h1 className="text-xl font-bold my-4">
                            Nhập thông tin
                        </h1>
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={fields.email}
                                onChange={setFieldValue}
                                id="email"
                                className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
                                placeholder="Email"
                            />
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={fields.password}
                                onChange={setFieldValue}
                                id="password"
                                className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
                                placeholder="Password"
                            />
                            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md">
                                Đăng nhập
                            </button>
                            <Link
                                className="text-sm mt-3 text-right "
                                href={'/signin'}
                            >
                                Không có tài khoản?
                                <span className="underline ml-1">Đăng ký</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
