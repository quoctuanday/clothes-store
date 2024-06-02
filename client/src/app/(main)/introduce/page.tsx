/* eslint-disable @next/next/no-img-element */
// introduce.tsx

'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Introduce = () => {
    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-16">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
                        Giới Thiệu{' '}
                        <span className="text-blue-600">FASHION SHOP</span>
                    </h1>
                    <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                        Thương hiệu thời trang FASHION SHOP được thành lập từ
                        tháng 3 năm 2024, là thương hiệu thời trang uy tín hàng
                        đầu tại Việt Nam.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-semibold text-gray-900 mb-6">
                            Tầm nhìn và Sứ mệnh
                        </h2>
                        <p className="text-xl text-gray-700 mb-6">
                            Không ngừng sáng tạo và tỉ mỉ từ công đoạn sản xuất
                            đến các khâu dịch vụ, nhằm mang đến cho Quý Khách
                            Hàng những trải nghiệm mua sắm đặc biệt nhất: sản
                            phẩm chất lượng - dịch vụ hoàn hảo - xu hướng thời
                            trang mới mẻ và tinh tế. Thông qua các sản phẩm thời
                            trang, FASHION SHOP luôn mong muốn truyền tải đến
                            bạn những thông điệp tốt đẹp cùng với nguồn cảm hứng
                            trẻ trung và tích cực.
                        </p>
                        <p className="text-xl text-gray-700 mb-6">
                            Tầm nhìn của chúng tôi là trở thành nhà bán lẻ hàng
                            đầu trong ngành thời trang, mang đến cho khách hàng
                            những xu hướng mới nhất và phong cách độc đáo. Sứ
                            mệnh của chúng tôi là cung cấp các sản phẩm thời
                            trang chất lượng cao, phù hợp với mọi phong cách và
                            ngân sách.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://360.com.vn/wp-content/uploads/2023/11/set-do-3.jpg"
                            alt="Tầm nhìn"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-2xl transition-transform transform hover:scale-105"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <motion.div
                        className="order-2 md:order-1 flex justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThH08VtfATeFNlohYOPOnj5NzGsQ9JDjNvyA&s"
                            alt="Giá trị cốt lõi"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-2xl transition-transform transform hover:scale-105"
                        />
                    </motion.div>
                    <motion.div
                        className="order-1 md:order-2 flex flex-col justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-semibold text-gray-900 mb-6">
                            Giá trị cốt lõi
                        </h2>
                        <p className="text-xl text-gray-700 mb-6">
                            Chúng tôi cam kết giữ vững các giá trị cốt lõi như
                            sự sáng tạo, chất lượng và sự hài lòng của khách
                            hàng trong mọi hoạt động kinh doanh. Những giá trị
                            này là nền tảng cho sự phát triển bền vững của chúng
                            tôi và là cam kết của chúng tôi với khách hàng.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl font-semibold text-gray-900 mb-6">
                        Đội ngũ của chúng tôi
                    </h2>
                    <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                        Đội ngũ của chúng tôi bao gồm những chuyên gia giàu kinh
                        nghiệm trong ngành thời trang, luôn tận tâm và nhiệt
                        huyết để mang đến những sản phẩm và dịch vụ tốt nhất cho
                        khách hàng.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-16">
                    {[
                        {
                            name: 'Nguyễn Quốc Tuấn',
                            facebook:
                                'https://www.facebook.com/profile.php?id=100014294951293',
                            facebookAvatar: '/images/avt_Tuan.webp',
                        },
                        {
                            name: 'Ngô Quang Anh',
                            facebook: 'https://www.facebook.com/qanh5102',
                            facebookAvatar: '/images/avt_QA.jpg',
                        },
                        {
                            name: 'Lý Nhật Long',
                            facebook: 'https://www.facebook.com/lynhatlog',
                            facebookAvatar: '/images/avt_long.webp',
                        },
                        {
                            name: 'Nguyễn Minh Tiến',
                            facebook:
                                'https://www.facebook.com/profile.php?id=100020561310168',
                            facebookAvatar: '/images/avt_Tien.jpg',
                        },
                        {
                            name: 'Nguyễn Tiến Đạt',
                            facebook: 'https://www.facebook.com/datchen28',
                            facebookAvatar: 'images/avt_dat.webp',
                        },
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src={member.facebookAvatar}
                                alt={`Thành viên đội ngũ ${index + 1}`}
                                width={162}
                                height={162}
                                className="rounded-full mx-auto shadow-2xl transition-transform transform hover:scale-105 bg-center bg-cover"
                            />
                            <h3 className="text-2xl font-semibold text-gray-900 mt-6">
                                <a
                                    href={member.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {member.name}
                                </a>
                            </h3>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mt-10 text-center">
                        <p className="text-gray-700">
                            Ấn vào nút dưới đây để trở về trang chủ
                        </p>
                        <Link href="/home" legacyBehavior>
                            <a className="text-blue-600 hover:underline">
                                Trang chủ
                            </a>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Introduce;
