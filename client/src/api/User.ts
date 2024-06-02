'use client';
import { Users } from '@/schema/user';
import { useEffect, useState } from 'react';

export default function UserData() {
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return users;
}
