import { Router } from 'express';
import { ActivityModel } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find().sort({ completedAt: -1 });
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activities' });
  }
});

export default router;
