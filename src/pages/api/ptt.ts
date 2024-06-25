import { kv } from '@vercel/kv';
import { readPdfText } from 'pdf-text-reader';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;
      const buffer = Buffer.from(file, 'base64');
      const uint8Array = new Uint8Array(buffer);
      const pdfText = await readPdfText({ data: uint8Array });

      await kv.set(`${req.body.user}-resume`, pdfText);

      res.status(200).json({ text: pdfText });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
