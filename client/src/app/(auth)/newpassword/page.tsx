'use client';

import React from 'react';
import Link from 'next/link';

function InvalidAccessPage() {
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-red-400">
                <h1 className="text-xl font-bold my-4 text-red-600">Bạn đã vào trang này sai cách hoặc bất hợp pháp, xin hãy trở lại</h1>
                <Link className="text-sm mt-3 text-right" href={'/login'}>
                    Quay lại trang đăng nhập
                    <span className="underline"> tại đây</span>
                </Link>
            </div>
        </div>
    );
}

export default InvalidAccessPage;
