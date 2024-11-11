import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const resume = await redis.get(`${req.query.user}-resume`);

      res.status(200).json({ text: resume });
    } catch (error) {
      res.status(500).json({ error: 'Error reading PDF file.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
