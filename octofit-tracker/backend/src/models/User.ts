import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  age: number;
  fitnessGoal: string;
  team: string;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    team: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', userSchema);
