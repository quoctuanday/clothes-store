// introduce.tsx

'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Introduce = () => {
    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Giới Thiệu</h1>
                    <p className="text-xl text-gray-600">
                        Chào mừng đến với trang web bán quần áo của chúng tôi! Chúng tôi tự hào mang đến cho bạn những sản phẩm thời trang chất lượng cao với dịch vụ khách hàng tuyệt vời. Hãy khám phá để biết thêm về chúng tôi.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-semibold text-gray-800 mb-4">Tầm nhìn và Sứ mệnh</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            Tầm nhìn của chúng tôi là trở thành nhà bán lẻ hàng đầu trong ngành thời trang, mang đến cho khách hàng những xu hướng mới nhất và phong cách độc đáo. Sứ mệnh của chúng tôi là cung cấp các sản phẩm thời trang chất lượng cao, phù hợp với mọi phong cách và ngân sách.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/images/vision.jpg"
                            alt="Tầm nhìn"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <motion.div
                        className="order-2 md:order-1 flex justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/images/values.jpg"
                            alt="Giá trị cốt lõi"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </motion.div>
                    <motion.div
                        className="order-1 md:order-2 flex flex-col justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-semibold text-gray-800 mb-4">Giá trị cốt lõi</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            Chúng tôi cam kết giữ vững các giá trị cốt lõi như sự sáng tạo, chất lượng và sự hài lòng của khách hàng trong mọi hoạt động kinh doanh. Những giá trị này là nền tảng cho sự phát triển bền vững của chúng tôi và là cam kết của chúng tôi với khách hàng.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-semibold text-gray-800 mb-4">Đội ngũ của chúng tôi</h2>
                    <p className="text-lg text-gray-600 mb-4">
                        Đội ngũ của chúng tôi bao gồm những chuyên gia giàu kinh nghiệm trong ngành thời trang, luôn tận tâm và nhiệt huyết để mang đến những sản phẩm và dịch vụ tốt nhất cho khách hàng.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
                    {[
                        { name: 'Nguyễn Văn A', position: 'Giám đốc điều hành', image: '/images/team1.jpg' },
                        { name: 'Trần Thị B', position: 'Trưởng phòng kinh doanh', image: '/images/team2.jpg' },
                        { name: 'Lê Văn C', position: 'Trưởng phòng thiết kế', image: '/images/team3.jpg' },
                        { name: 'Phạm Thị D', position: 'Trưởng phòng marketing', image: '/images/team4.jpg' },
                        { name: 'Vũ Văn E', position: 'Chuyên viên chăm sóc khách hàng', image: '/images/team5.jpg' },
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src={member.image}
                                alt={`Thành viên đội ngũ ${index + 1}`}
                                width={300}
                                height={300}
                                className="rounded-full mx-auto shadow-lg"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">{member.name}</h3>
                            <p className="text-lg text-gray-600">{member.position}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Ấn vào nút dưới đây để trở về trang chủ</p>
                    <Link href="/home" legacyBehavior>
                    <a className="text-blue-500 hover:underline">Trang chủ</a>
                    </Link>
                </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Introduce;
