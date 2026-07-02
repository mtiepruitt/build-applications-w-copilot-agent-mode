import { Schema, model } from 'mongoose';

export interface Activity {
  username: string;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ActivityModel = model<Activity>('Activity', activitySchema);
