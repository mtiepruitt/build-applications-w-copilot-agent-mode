import { Router } from 'express';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find().sort({ rank: 1 });
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

export default router;
