import { Router } from 'express';
import activitiesRouter from './activities';
import leaderboardRouter from './leaderboard';
import teamsRouter from './teams';
import usersRouter from './users';
import workoutsRouter from './workouts';

const router = Router();

router.use('/users', usersRouter);
router.use('/teams', teamsRouter);
router.use('/activities', activitiesRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/workouts', workoutsRouter);

export default router;
