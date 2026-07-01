import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { apiBaseUrl, port } from './config';
import { connectDatabase } from './config/database';
import apiRoutes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
