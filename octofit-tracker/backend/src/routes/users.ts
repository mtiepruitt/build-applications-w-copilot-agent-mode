import { Router } from 'express';
import { UserModel } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find().sort({ displayName: 1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' });
  }
});

export default router;
