import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [user, setUser] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleUserChange = (event: any) => {
    setUser(event.target.value);
  };

  const handleUpdateResume = async () => {
    if (selectedFile) {
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
        reader.readAsDataURL(selectedFile);
      } catch (err) {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/feedback?user=' + user);
    const data = await response.json();
    setFeedback(data.text);
    setLoading(false);
  };

  return (
    <Wrapper>
      <Title src="/logo2.png" alt="Viva" width={112.6} height={30.8} />
      <TextInput
        onChange={handleUserChange}
        placeholder="이름이 무엇인가요?"
        disabled={loading}
      />
      <FileInputWrapper>
        <FileInputLabel htmlFor="file-input">
          {selectedFile ? selectedFile.name : 'pdf 이력서 업로드하기'}
        </FileInputLabel>
        <FileInput
          id="file-input"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={loading}
        />
      </FileInputWrapper>
      <ButtonWrapper>
        <Button onClick={handleUpdateResume} disabled={loading}>
          이력서 적용하기
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          피드백 확인하기
        </Button>
      </ButtonWrapper>
      {feedback && (
        <Result>
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </Result>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  margin: 10px;
  border-radius: 20px;
  max-width: 600px;
  background: rgba(80, 80, 80, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled(Image)`
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
`;

const TextInput = styled.input`
  padding: 10px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  &:disabled {
    background-color: #e0e0e0;
  }
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #a9b1f8;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
  &:hover {
    background-color: #d9b6f9;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Result = styled.div`
  margin-top: 20px;
  padding: 20px 20px 20px 30px;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
