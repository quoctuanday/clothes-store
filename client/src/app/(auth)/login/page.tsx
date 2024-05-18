'use client';
import { useEffect, useState } from 'react';
import { Users } from '@/schema/user';

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
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            className="border-2"
                            type="email"
                            name="email"
                            value={fields.email}
                            onChange={setFieldValue}
                            id="email"
                        />
                        <br />
                        <label htmlFor="password">password</label>
                        <br />
                        <input
                            className="border-2"
                            type="password"
                            name="password"
                            value={fields.password}
                            onChange={setFieldValue}
                            id="password"
                        />
                        <br />
                        <button>Login</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default LoginPage;
