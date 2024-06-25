// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-proj-onE83Q3jYILWBFpiMNcWT3BlbkFJaETrtNLqFN67H9eP0oWE',
});

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const threadId = await kv.get<string>('threadId');
    if (!threadId) {
      return res.status(400).json({ error: 'Thread ID not found' });
    }

    const list = await openai.beta.threads.messages.list(threadId);
    for (const ppap of list.data) {
      console.log(
        `${ppap.role}: ${ppap.content[0].text.value}`,
        '\n\n --- \n\n'
      );
    }

    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to process interview' });
  }
}
