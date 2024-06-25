// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-proj-onE83Q3jYILWBFpiMNcWT3BlbkFJaETrtNLqFN67H9eP0oWE',
});

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const vectorStore = await openai.beta.vectorStores.create({
      name: 'Resume Storage',
    });
    const assistant = await openai.beta.assistants.create({
      name: 'Interview Assistant',
      instructions:
        'You are an expert interviewer. Use the provided resume to generate relevant interview questions.',
      model: 'gpt-4o',
      tools: [{ type: 'file_search' }],
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id],
        },
      },
    });
    await kv.set('assistantId', assistant.id);
    await kv.set('vectorStoreId', vectorStore.id);

    console.log(await kv.get('assistantId'), await kv.get('vectorStoreId'));

    res.status(200).json({
      message: 'Successfully initialized assistant',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to initialize assistant' });
  }
}
