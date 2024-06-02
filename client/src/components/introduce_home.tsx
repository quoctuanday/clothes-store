'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const IntroduceContainer = styled.div`
    padding: 20px;
    background: #ffffff; // Đổi nền thành màu trắng
    border-radius: 8px;
    text-align: center;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 1s ease-in;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const IntroduceTitle = styled.h1`
    font-size: 2.5em;
    color: #333333;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    animation: ${fadeIn} 1.5s ease-in;
`;

const IntroduceText = styled.p`
    font-size: 1.2em;
    color: #333333;
    line-height: 1.6;
    margin-bottom: 15px;
    text-align: justify;
    animation: ${fadeIn} 2s ease-in;
`;

const IntroduceHome: React.FC = () => {
    return (
        <IntroduceContainer>
            <IntroduceTitle>Chào mừng đến với Fashion Shop</IntroduceTitle>
            <IntroduceText>
                Tại Fashion Shop, chúng tôi mang đến cho bạn những bộ sưu tập
                quần áo thời trang mới nhất và chất lượng nhất. Với sứ mệnh làm
                nổi bật phong cách cá nhân của từng khách hàng, chúng tôi không
                ngừng cập nhật những xu hướng thời trang mới nhất trên thế giới.
            </IntroduceText>
            <IntroduceText>
                Dù bạn đang tìm kiếm trang phục công sở thanh lịch, trang phục
                dạo phố năng động, hay những bộ đồ dự tiệc sang trọng, chúng tôi
                đều có thể đáp ứng nhu cầu của bạn. Hãy khám phá các bộ sưu tập
                của chúng tôi và tìm kiếm cho mình những trang phục hoàn hảo
                nhất.
            </IntroduceText>
            <IntroduceText>
                Đội ngũ nhân viên thân thiện và chuyên nghiệp của chúng tôi luôn
                sẵn sàng hỗ trợ bạn trong suốt quá trình mua sắm. Cảm ơn bạn đã
                tin tưởng và lựa chọn Fashion Shop.
            </IntroduceText>
        </IntroduceContainer>
    );
};

export default IntroduceHome;
