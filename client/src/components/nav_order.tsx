import Link from 'next/link';
import React from 'react';

function NavbarOrder() {
    return (
        <div>
            <div className="grid grid-cols-5 p-5 border-b-2 ">
                <Link
                    href="/order"
                    className="col-span-1 text-center roboto-regular"
                >
                    Chờ xử lí
                </Link>
                <Link
                    href="/order/pickup"
                    className="col-span-1 text-center roboto-regular"
                >
                    Chờ lấy hàng
                </Link>
                <Link
                    href="/order/shiping"
                    className="col-span-1 text-center roboto-regular"
                >
                    Chờ giao hàng
                </Link>
                <Link
                    href="/order/delivered"
                    className="col-span-1 text-center roboto-regular"
                >
                    Đã giao
                </Link>
                <Link
                    href="/order/canceled"
                    className="col-span-1 text-center roboto-regular"
                >
                    Đã hủy
                </Link>
            </div>
        </div>
    );
}

export default NavbarOrder;
