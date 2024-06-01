'use client'
import React, { useState } from 'react';

export default function ResetPassword() {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => { 
       
        try {
            const response = await fetch('http://localhost:8000/auth/sendmail', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Server response:', data);
                alert('Email đã được gửi đi!');
            } catch (error) {
                alert('Email đã được gửi đi thành công.');
                
            }
    };  

    return (
        <div className='grid place-items-center h-screen'>
            <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
                <h1 className='text-xl font-bold my-4'>Nhập email của bạn</h1>
                <form className='flex flex-col gap-3' onSubmit={handleResetPassword}> {/* Gọi hàm handleResetPassword khi submit */}
                    <input 
                        type="email" 
                        placeholder='Email' 
                        className='input-reset-password' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị của email
                        required autoFocus
                    />
                    <button 
                        type="submit" 
                        className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'
                    >
                        Reset password
                    </button>
                </form>
            </div>
        </div>
    );
}
