import cors from 'cors';
import express from 'express';
import { port } from './config';
import { connectDatabase } from './config/database';
import apiRoutes from './routes';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

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
