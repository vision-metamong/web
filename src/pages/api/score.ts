import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { feedback, user } = req.body;
      if (!feedback || !user) {
        throw new Error('Invalid request payload');
      }

      const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              '당신은 이력서의 피드백을 바탕으로 점수를 부여하는 로봇입니다. 평가할 항목은 다음과 같습니다. <의사소통 능력(communication)>, <직무 관련 지식 및 역량(competence)>, <대인 관계 능력(interpersonal)>, <적응력 및 유연성(adaptability)>, <직업 가치관 및 태도(attitude))>, 그리고 <모든 점수의 평균(total)>. 당신은 입력으로 들어오는 피드백을 바탕으로 위 학목들을 평가해야 합니다. 0점에서 100점으로 평가해야하고, 모호한 항목은 60점으로 계산하면 됩니다. 절대로 평가를 포기하면 안되고, 무조건 점수를 줘야합니다. 또한, 당신의 응답은 무조건 json 형식을 유지해야합니다. json 응답 외의 다른 데이터는 반환하면 안됩니다. 예시 출력입니다. "{total: 30, communication: 30, competence: 30, interpersonal: 30, adaptability: 30, attitude: 30}"',
          },
          { role: 'user', content: feedback },
        ],
        response_format: { type: 'json_object' },
      });
      const result = completion.choices[0].message.content;
      if (!result) {
        throw new Error('Invalid response in POST /api/score');
      }

      res.status(200).json({ text: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
