import styled from '@emotion/styled';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Feedback() {
  const params = useParams<{ id: string }>();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState({
    total: 0,
    communication: 0,
    competence: 0,
    interpersonal: 0,
    adaptability: 0,
    attitude: 0,
  });

  useEffect(() => {
    if (!params) return;
    setLoading(true);
    fetch('/api/feedback?user=' + params.id)
      .then((res) => res.json())
      .then((data) => {
        if (!data.text) {
          throw new Error('Invalid response in GET /api/feedback');
        }
        setFeedback(data.text);
        fetch('/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            feedback: data.text,
            user: params.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.text) {
              throw new Error('Invalid response in POST /api/score');
            }

            const result = JSON.parse(data.text);
            setScore(result);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });
      });
  }, [params]);

  return (
    <Wrapper>
      {feedback && !loading && (
        <>
          <Dashboard>
            <Title>면접 평과 결과입니다</Title>
            <Score>
              <A>총 점수</A>
              <Number>{score.total}</Number>
            </Score>
            <Status>
              <Box>
                <B>
                  의사소통 능력<C>{score.communication}</C>
                </B>
                <Progress max="100" value={score.communication}></Progress>
              </Box>
              <Box>
                <B>
                  직무 관련 지식 및 역량<C>{score.competence}</C>
                </B>
                <Progress max="100" value={score.competence}></Progress>
              </Box>
              <Box>
                <B>
                  대인 관계 능력<C>{score.interpersonal}</C>
                </B>
                <Progress max="100" value={score.interpersonal}></Progress>
              </Box>
              <Box>
                <B>
                  적응력 및 유연성<C>{score.adaptability}</C>
                </B>
                <Progress max="100" value={score.adaptability}></Progress>
              </Box>
              <Box>
                <B>
                  직업 가치관 및 태도<C>{score.attitude}</C>
                </B>
                <Progress max="100" value={score.attitude}></Progress>
              </Box>
            </Status>
          </Dashboard>
          <Result>{feedback + feedback}</Result>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1100px;
  height: 778px;

  border-radius: 40px;
  padding: 46px;
  /* padding: 51px; */
  background: #fff;
  /* Drop Shadow */
  box-shadow: 0px 0px 30px 0px rgba(35, 164, 231, 0.1);

  @media (max-width: 1300px) {
    flex-direction: column;
    width: 800px;
    height: unset;
    min-height: 778px;
    scale: 0.8;
  }
  @media (max-width: 700px) {
    scale: 0.6;
  }
  @media (max-width: 500px) {
    scale: 0.4;
  }
`;

const Dashboard = styled.div`
  min-width: 390px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  @media (max-width: 1300px) {
    min-width: 100%;
  }
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 48px */
  letter-spacing: -0.704px;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;
`;

const A = styled.div`
  color: #8e9ead;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 36px */
  letter-spacing: -0.528px;
  padding-top: 10px;
`;

const Number = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 105px */
  letter-spacing: -1.54px;
`;

const Status = styled.div`
  border-radius: 10px;
  border: 1px solid #b0c0d0;
  background: #edf0f5;
  width: 100%;
  height: 461px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const B = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.44px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const C = styled.div`
  color: #3d6dfb;
`;

const Result = styled(ReactMarkdown)`
  max-height: 691px;
  overflow-y: auto;
  margin-left: 29px;
  border-radius: 10px;
  border: 1.2px solid #b0c0d0;
  padding: 25px;

  @media (max-width: 1300px) {
    margin: 0;
    margin-top: 25px;
  }
`;

const Progress = styled.progress`
  margin-top: 10px;
  height: 32px;
  width: 100%;
`;
