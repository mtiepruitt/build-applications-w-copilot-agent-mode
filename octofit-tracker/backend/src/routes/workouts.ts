import { Router } from 'express';
import { WorkoutModel } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().sort({ difficulty: 1, title: 1 });
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts' });
  }
});

export default router;
