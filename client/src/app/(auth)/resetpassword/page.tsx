'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function ResetPassword() {
    
    
    return (
        <div className='grid place-items-center h-screen'>
            <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
                <h1 className='text-xl font-bold my-4'>Nhập email của bạn</h1>
                <form className='flex flex-col gap-3'>
                    <input type="text" placeholder='Email' className='input-reset-password' />
                    <Link href="/sendmail">
                        <button type="button" className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'>
                            Reset password
                        </button>        
                        </Link>       
                         </form>
            </div>
        </div>
    );
}
