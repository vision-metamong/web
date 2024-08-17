import { kv } from '@vercel/kv';
import pdf from 'pdf-parse';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      console.log('ppap');
      const { file } = req.body;
      const buffer = Buffer.from(file, 'base64');

      const dataBuffer = buffer;

      const data = await pdf(dataBuffer);

      await kv.set(`${req.body.user}-resume`, data.text);

      res.status(200).json({ text: data.text });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
