import { Router } from 'express';
import { TeamModel } from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await TeamModel.find().sort({ name: 1 });
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams' });
  }
});

export default router;
