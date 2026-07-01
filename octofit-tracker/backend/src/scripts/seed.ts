import { connectDatabase, disconnectDatabase } from '../database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

const users = [
  {
    username: 'ava_runner',
    email: 'ava.runner@example.com',
    displayName: 'Ava Brooks',
    age: 29,
    fitnessGoal: 'Run a half marathon',
    team: 'Trail Blazers',
  },
  {
    username: 'marco_lifts',
    email: 'marco.lifts@example.com',
    displayName: 'Marco Chen',
    age: 34,
    fitnessGoal: 'Build strength',
    team: 'Iron Giants',
  },
  {
    username: 'sam_flow',
    email: 'sam.flow@example.com',
    displayName: 'Sam Rivera',
    age: 26,
    fitnessGoal: 'Improve mobility',
    team: 'Core Crew',
  },
];

const teams = [
  {
    name: 'Trail Blazers',
    motto: 'Every mile counts',
    memberCount: 8,
    weeklyGoalMinutes: 900,
  },
  {
    name: 'Iron Giants',
    motto: 'Lift steady, live strong',
    memberCount: 6,
    weeklyGoalMinutes: 720,
  },
  {
    name: 'Core Crew',
    motto: 'Balanced bodies, focused minds',
    memberCount: 7,
    weeklyGoalMinutes: 840,
  },
];

const activities = [
  {
    username: 'ava_runner',
    activityType: 'Outdoor run',
    durationMinutes: 48,
    caloriesBurned: 430,
    completedAt: new Date('2026-06-29T13:30:00Z'),
  },
  {
    username: 'marco_lifts',
    activityType: 'Strength training',
    durationMinutes: 55,
    caloriesBurned: 360,
    completedAt: new Date('2026-06-30T22:15:00Z'),
  },
  {
    username: 'sam_flow',
    activityType: 'Yoga flow',
    durationMinutes: 40,
    caloriesBurned: 180,
    completedAt: new Date('2026-07-01T12:00:00Z'),
  },
];

const leaderboard = [
  {
    username: 'ava_runner',
    points: 1480,
    rank: 1,
    streakDays: 12,
  },
  {
    username: 'marco_lifts',
    points: 1325,
    rank: 2,
    streakDays: 9,
  },
  {
    username: 'sam_flow',
    points: 1190,
    rank: 3,
    streakDays: 7,
  },
];

const workouts = [
  {
    title: 'Tempo Run Builder',
    focusArea: 'Cardio endurance',
    difficulty: 'intermediate' as const,
    durationMinutes: 45,
    suggestedForGoal: 'Run a half marathon',
  },
  {
    title: 'Full-Body Strength Circuit',
    focusArea: 'Strength',
    difficulty: 'intermediate' as const,
    durationMinutes: 50,
    suggestedForGoal: 'Build strength',
  },
  {
    title: 'Morning Mobility Reset',
    focusArea: 'Mobility',
    difficulty: 'beginner' as const,
    durationMinutes: 25,
    suggestedForGoal: 'Improve mobility',
  },
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await Promise.all([
    UserModel.insertMany(users),
    TeamModel.insertMany(teams),
    ActivityModel.insertMany(activities),
    LeaderboardEntryModel.insertMany(leaderboard),
    WorkoutModel.insertMany(workouts),
  ]);

  console.log('Seeded users, teams, activities, leaderboard, and workouts.');
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
