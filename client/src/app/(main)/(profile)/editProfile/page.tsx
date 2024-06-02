'use client';
import { useEffect, useState } from 'react';
import UserLoginData from '@/api/UserLogin';
import Image from 'next/image';
import { Users } from '@/schema/user';

function EditProfilePage() {
    const user = UserLoginData();
    const [formData, setFormData] = useState<Users>({
        _id: '',
        userName: '',
        password: '',
        image: '',
        phone: '',
        email: '',
        fullName: '',
        gender: '',
        address: '',
        role: '',
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            gender: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?._id) {
            alert('User ID không tồn tại');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8000/user/updateProfile/${user._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Cập nhật thành công');
            } else {
                alert('Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Cập nhật thất bại');
        }
    };

    return (
        <div className="p-5">
            <h1 className="capitalize roboto-bold text-2xl mb-2 ml-10">
                Chỉnh sửa thông tin cá nhân
            </h1>

            {user ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-9 gap-10">
                            <div className="col-span-6">
                                <div className="mb-4 grid grid-cols-3">
                                    <label className="col-span-1 roboto-regular flex items-center justify-end">
                                        Tên đăng nhập:
                                    </label>
                                    <input
                                        className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                                        type="text"
                                        value={formData.userName}
                                        id="userName"
                                        name="userName"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-3">
                                    <label className="col-span-1 roboto-regular  flex items-center justify-end">
                                        Họ và tên:
                                    </label>
                                    <input
                                        className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                                        type="text"
                                        value={formData.fullName}
                                        id="fullName"
                                        name="fullName"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-3">
                                    <label className="col-span-1 roboto-regular l-10 flex items-center justify-end">
                                        Số điện thoại:
                                    </label>
                                    <input
                                        className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                                        type="number"
                                        value={formData.phone}
                                        id="phone"
                                        name="phone"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-3">
                                    <label className="col-span-1 roboto-regular flex items-center justify-end">
                                        Email:
                                    </label>
                                    <input
                                        className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                                        type="email"
                                        value={formData.email}
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-3">
                                    <label className="col-span-1 roboto-regular flex items-center justify-end">
                                        Địa chỉ:
                                    </label>
                                    <input
                                        className="col-span-2 ml-3 border border-gray-300 rounded p-1"
                                        type="text"
                                        value={formData.address}
                                        id="address"
                                        name="address"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-3">
                                    <label className="col-span-1 roboto-regular flex items-center justify-end">
                                        Giới tính:
                                    </label>
                                    <div className="col-span-2 ml-3 flex items-center">
                                        <input
                                            className="mr-2"
                                            type="radio"
                                            value="Nam"
                                            id="male"
                                            name="gender"
                                            checked={formData.gender === 'Nam'}
                                            onChange={handleGenderChange}
                                        />
                                        <label htmlFor="male" className="mr-4">
                                            Nam
                                        </label>
                                        <input
                                            className="mr-2"
                                            type="radio"
                                            value="Nữ"
                                            id="female"
                                            name="gender"
                                            checked={formData.gender === 'Nữ'}
                                            onChange={handleGenderChange}
                                        />
                                        <label htmlFor="female">Nữ</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex items-center justify-center">
                                    <Image
                                        className="rounded over"
                                        src={formData.image}
                                        alt="User image"
                                        objectFit="cover"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <h1 className="text-center roboto-regular text-xl">
                                    Avatar
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="p-2 rounded bg-[#7000FF] text-white hover:bg-[#6816d3] roboto-regular"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    
                    <h1>Chưa đăng nhập</h1>
                </>
            )}
        </div>
    );
}

export default EditProfilePage;
