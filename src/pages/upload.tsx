import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Upload() {
  const [user, setUser] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event: any) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        if (result) {
          const base64String = result.split(',')[1];
          const response = await fetch('/api/ptt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, file: base64String }),
          });

          if (response.ok) {
            // Handle success response
          } else {
            const { error } = await response.json();
            // Handle error appropriately
          }
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {selectedFile && !loading ? (
        <>
          <ResumeIcon src="/resume.png" alt="resume" width={126} height={126} />
          <Desc2>
            업로드가 완료되었어요. <br /> 면접을 시작해 주세요.
          </Desc2>
          <SelectedInfo>{selectedFile?.name ?? '당신의 이력서'}</SelectedInfo>
          <ViewResult href={'/feedback/' + user}>결과보기</ViewResult>
        </>
      ) : (
        <>
          <ResumeIcon src="/resume.png" alt="resume" width={126} height={126} />
          <Desc>
            ID(전화번호 뒷자리):
            <Input onChange={(e) => setUser(e.target.value)} />
          </Desc>
          <SubmitArea>
            이력서를 올려주세요
            <FileInputWrapper>
              <FileInputLabel htmlFor="file-input" disabled={user === ''}>
                파일 선택하기
              </FileInputLabel>
              <FileInput
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={loading || user === ''}
              />
            </FileInputWrapper>
          </SubmitArea>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  width: 800px;
  height: 778px;
  border-radius: 40px;
  /* padding: 51px; */
  background: #fff;
  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);

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

const ResumeIcon = styled(Image)`
  margin-bottom: 17px;
`;

const Desc = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 200%; /* 80px */
  letter-spacing: -0.88px;
  height: 121px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitArea = styled.div`
  width: 705px;
  height: 338px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 2px dashed var(--point_color, #28c5c4);
  background: rgba(103, 219, 255, 0.1);
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 80px */
  letter-spacing: -0.88px;

  margin-bottom: 51px;

  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const FileInputLabel = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;
  background: ${({ disabled }) =>
    disabled ? '#e0e0e0' : 'var(--point_color, #28c5c4)'};
  color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 200%; /* 60px */
  letter-spacing: -0.66px;
  width: 337px;
  height: 76px;
  padding-top: 5px;

  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);
`;

const FileInput = styled.input`
  display: none;
`;

const Input = styled.input`
  width: 140px;
  font-size: 40px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  margin-left: 10px;
`;

///

const Desc2 = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 60px */
  letter-spacing: -0.88px;
  margin-bottom: 58px;
`;

const SelectedInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 30px;
  border: 2px solid var(--point_color, #28c5c4);
  background: rgba(103, 219, 255, 0.1);
  width: 705px;
  height: 120px;
  flex-shrink: 0;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 200%; /* 60px */
  letter-spacing: -0.66px;

  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);
`;

const ViewResult = styled(Link)`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 200%; /* 60px */
  letter-spacing: -0.66px;
  margin-top: 65px;

  width: 300px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 40px;
  background: var(--base_color2, #404f5c);
  padding-top: 7px;
  margin-bottom: 70px;

  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);
`;
