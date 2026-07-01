import mongoose from 'mongoose';
import { mongoUri } from '../config';

export async function connectDatabase() {
  return mongoose.connect(mongoUri, {
    dbName: 'octofit_db',
  });
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}
