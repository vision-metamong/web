import { kv } from '@vercel/kv';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { history, user } = req.body;
      if (!history || !user) {
        throw new Error('Invalid request payload');
      }

      const ppap = JSON.stringify(history);
      console.log(ppap);
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              '당신은 면접 피드백을 주는 사람입니다. 면접자가 llm과 대화한 내용의 json을 바탕으로 면접자에게 피드백을 주세요. 참고로 json에서 system은 시스템의 역할을 나타내며 user는 면접자의 역할을 나타냅니다. assistant는 면접관을 역할을 나타냅니다. 우선 면접자의 이력을 텍스트로 받아오고, assistant에게 입력했습니다. 따라서, 면접자가 자기소개하는 순간부터 집중해서 피드백해주세요.',
          },
          { role: 'user', content: ppap },
        ],
        model: 'gpt-4o',
      });

      await kv.set(`${user}-feedback`, completion.choices[0].message.content);

      res.status(200).json({ text: completion.choices[0].message.content });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else if (req.method === 'GET') {
    try {
      const feedback = await kv.get(`${req.query.user}-feedback`);
      res.status(200).json({ text: feedback });
    } catch (error) {
      res.status(500).json({ error: 'Error reading PDF file.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}