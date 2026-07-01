import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  username: string;
  points: number;
  rank: number;
  streakDays: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    username: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { timestamps: true }
);

export const LeaderboardEntryModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
