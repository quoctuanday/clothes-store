'use client';
import UserData from '@/api/User';
import React, { useState } from 'react';
import { CiLock, CiUnlock } from 'react-icons/ci';
import Link from 'next/link';

function AdminCustomerPage() {
    const user = UserData();
    const [formVisible, setFormVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [userToBlock, setUserToBlock] = useState<boolean | null>(null);

    const handleBlockClick = (userID: string, blockStatus: boolean) => {
        setSelectedUser(userID);
        setUserToBlock(blockStatus);
        setFormVisible(true);
    };

    const handleCloseForm = () => {
        setFormVisible(false);
        setSelectedUser(null);
    };

    const handleBlockUser = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/user/updateProfile/${selectedUser}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ block: !userToBlock }),
                }
            );
        } catch (error) {
            console.log(error, 'Không thể khóa tài khoản người dùng');
        }
        console.log(`Block user with id: ${selectedUser}`);

        handleCloseForm();
    };
    return (
        <div className="px-2">
            <div className="text-center p-10 roboto-bold text-3xl">
                Khách hàng
            </div>
            <div className="grid grid-cols-12 px-5 roboto-bold gap-3">
                <div className="col-span-1 text-center">Số TT</div>
                <div className="col-span-2">Tên khách hàng</div>
                <div className="col-span-2">Địa chỉ email</div>
                <div className="col-span-2">Số điện thoại</div>
                <div className="col-span-2">Địa chỉ nơi ở</div>
                <div className="col-span-1">Quyền</div>
                <div className="col-span-2">Thao tác</div>
            </div>
            {user.map((user, index) => (
                <div
                    key={user._id}
                    className="grid grid-cols-12 px-5 py-2 roboto-regular gap-3 "
                >
                    <div className="col-span-1 flex items-center justify-center">
                        {index + 1}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {user.fullName}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {user.email}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {user.phone}
                    </div>
                    <div className="col-span-2 flex items-center line-clamp-2">
                        {user.address}
                    </div>
                    <div className="col-span-1 flex items-center">
                        {user.role}
                    </div>
                    <div className="col-span-2 flex items-center">
                        <button className="rounded py-[6px] px-[12px] hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0] mr-2">
                            <Link href={`customer/${user._id}`}>Xem</Link>
                        </button>
                        <button
                            className="rounded px-[12px] py-[10px] hover:bg-[#dc3545] hover:text-[white] border-[1px] border-[#dc3545] text-[#dc3545]"
                            onClick={() =>
                                handleBlockClick(user._id, user.block)
                            }
                        >
                            {user.block ? <CiLock /> : <CiUnlock />}
                        </button>
                    </div>
                </div>
            ))}

            {formVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-2xl mb-4 roboto-bold">
                            {userToBlock
                                ? 'Mở khóa tài khoản người dùng'
                                : 'Khóa tài khoản người dùng'}
                        </h2>
                        <p className="roboto-thin">
                            Bạn có muốn {userToBlock ? 'mở khóa' : 'khóa'} tài
                            khoản người dùng này không ?
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={handleCloseForm}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => {
                                    handleBlockUser();
                                }}
                            >
                                {userToBlock ? 'Mở khóa' : 'Khóa'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminCustomerPage;
