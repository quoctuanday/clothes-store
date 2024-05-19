import { useState, useEffect } from 'react';
import { Users } from '@/schema/user';

let userData: Users | null = null;

const UserLoginData = () => {
    const [user, setUser] = useState<Users | null>(userData);

    useEffect(() => {
        if (userData === null) {
            fetch('http://localhost:8000/auth/login/me', {
                credentials: 'include',
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch user');
                    }
                    return res.json();
                })
                .then((data) => {
                    userData = data;
                    setUser(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    return user;
};

export default UserLoginData;

export const clearUserData = () => {
    userData = null;
};
