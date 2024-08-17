import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

export default function Home() {
  const feedbackLinkHandler = useCallback(() => {
    const id = prompt('전화번호 뒷자리를 입력해주세요');
    if (id) {
      window.location.href = `/feedback/${id}`;
    }
  }, []);

  return (
    <Wrapper>
      <Title>
        Go higher, <A /> with Viva
      </Title>
      <Desc>VR 환경에서 실감나게 면접을 준비하세요.</Desc>
      <Desc>지원하는 회사와 원하는 면접관으로 연습할 수 있습니다.</Desc>
      <ButtonBox>
        <UploadLink href={'/upload'}>이력서 업로드하기</UploadLink>
        <FeedbackLink onClick={feedbackLinkHandler}>결과 보기</FeedbackLink>
      </ButtonBox>
      <VisionPro
        src="/visionpro.png"
        alt="visionPro"
        width={475}
        height={223}
      />
    </Wrapper>
  );
}

const A = styled.br`
  display: none;
  @media (max-width: 1300px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 1300px) {
    scale: 0.8;
  }
  @media (max-width: 700px) {
    scale: 0.6;
  }
  @media (max-width: 500px) {
    scale: 0.4;
  }
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: 'AvantGarde CE';
  font-size: 90px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 135px */
  letter-spacing: -1.98px;
  margin-bottom: 44px;
`;

const Desc = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 60px */
  letter-spacing: -0.66px;
`;

const ButtonBox = styled.div`
  margin-top: 54px;
  text-align: center;
  font-family: SUIT;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 45px */
  letter-spacing: -0.66px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const UploadLink = styled(Link)`
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 304px;
  height: 98px;
  border-radius: 55px;
  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);
  color: #000;
  background: #fff;
`;

const FeedbackLink = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 304px;
  height: 98px;
  border-radius: 55px;
  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);
  color: #fff;
  background: #000;
`;

const VisionPro = styled(Image)`
  margin-top: 91px;
`;
