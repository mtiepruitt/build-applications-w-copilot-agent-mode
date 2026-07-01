import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  motto: string;
  memberCount: number;
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export const TeamModel = model<Team>('Team', teamSchema);
