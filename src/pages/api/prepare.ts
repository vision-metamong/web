// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const {
      body: { uploadedFileId, threadId },
    } = req;

    await kv.set('uploadedFileId', uploadedFileId);
    await kv.set('threadId', threadId);

    console.log(await kv.get('uploadedFileId'), await kv.get('threadId'));

    res.status(200).json({
      message: 'Successfully prepared interview',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to prepared interview' });
  }
}
