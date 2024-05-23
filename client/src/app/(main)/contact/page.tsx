'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Đang gửi...');

        emailjs.send(
            'service_b8sv9l8', // Service ID 
            'template_2ggjwmf', // Template ID
            formData,
            'oWSWSNhtk3A_4rX4x' // User ID
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setStatus('Gửi tin nhắn thành công!');
            setFormData({ name: '', email: '', phone: '', message: '' });
        })
        .catch((error) => {
            console.error('FAILED...', error);
            setStatus('Gửi tin nhắn thất bại. Vui lòng thử lại.');
        });
    };

    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col space-y-6 p-10 bg-white rounded-lg shadow-md">
                        <div className="flex items-center">
                            <Image
                                src="/icons/contact.png"
                                alt="name"
                                width={28}
                                height={28}
                                className="animate-bounce"
                            />
                            <span className="ml-4 text-lg text-gray-700 font-medium">TÊN: ABCXYZ</span>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/icons/phone.png"
                                alt="phone"
                                width={28}
                                height={28}
                                className="animate-bounce"
                            />
                            <span className="ml-4 text-lg text-gray-700 font-medium">SĐT: 0987654321</span>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/icons/location.png"
                                alt="location"
                                width={28}
                                height={28}
                                className="animate-bounce"
                            />
                            <span className="ml-4 text-lg text-gray-700 font-medium">ĐỊA ĐIỂM: XNXXXXX</span>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/icons/address.png"
                                alt="address"
                                width={28}
                                height={28}
                                className="animate-bounce"
                            />
                            <span className="ml-4 text-lg text-gray-700 font-medium">ĐỊA CHỈ: Hà Nội</span>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/icons/website.png"
                                alt="website"
                                width={28}
                                height={28}
                                className="animate-bounce"
                            />
                            <span className="ml-4 text-lg text-gray-700 font-medium">WEBSITE: ABCXYZ.com</span>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/icons/mail.png"
                                alt="mail"
                                width={28}
                                height={28}
                                className="animate-bounce"
                            />
                            <span className="ml-4 text-lg text-gray-700 font-medium">EMAIL: ABCXYZ@gmail.com</span>
                        </div>
                    </div>
                    <div className="bg-white p-10 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Gửi tin nhắn cho chúng tôi</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Họ tên"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    aria-label="Họ tên"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition duration-300"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    aria-label="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition duration-300"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    aria-label="Số điện thoại"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition duration-300"
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    name="message"
                                    placeholder="Tin nhắn"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    aria-label="Tin nhắn"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition duration-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Gửi
                            </button>
                        </form>
                        {status && <p className="mt-4 text-center text-gray-600 font-medium">{status}</p>}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">Ấn vào nút dưới đây để trở về trang chủ</p>
                            <Link href="/home" className="text-blue-500 hover:underline">
                                Trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
