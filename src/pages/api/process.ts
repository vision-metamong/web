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

    const assistantId = await kv.get<string>('assistantId');
    if (!assistantId) {
      return res.status(400).json({ error: 'Assistant ID not found' });
    }

    const startTime = new Date();
    const threadMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: 'ai에게 질문하며 문제를 해결했습니다.',
    });
    const endTime = new Date();
    console.log(
      'Time to create message:',
      endTime.getTime() - startTime.getTime()
    );

    const startTime2 = new Date();
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      model: 'gpt-4o',
    });
    const endTime2 = new Date();
    console.log(
      'Time to create and poll run:',
      endTime2.getTime() - startTime2.getTime()
    );

    const startTime3 = new Date();
    const messages = await openai.beta.threads.messages.list(threadId, {
      run_id: run.id,
    });
    const endTime3 = new Date();
    console.log(
      'Time to list messages:',
      endTime3.getTime() - startTime3.getTime()
    );

    const message = messages.data.pop()!;
    if (message.content[0].type === 'text') {
      const { text } = message.content[0];
      const { annotations } = text;
      const citations: string[] = [];

      let index = 0;
      for (let annotation of annotations) {
        text.value = text.value.replace(annotation.text, '[' + index + ']');
        const { file_citation } = annotation;
        if (file_citation) {
          const citedFile = await openai.files.retrieve(file_citation.file_id);
          citations.push('[' + index + ']' + citedFile.filename);
        }
        index++;
      }

      console.log(text.value);
      console.log(citations.join('\n'));
    }

    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to process interview' });
  }
}
