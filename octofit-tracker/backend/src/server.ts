import express from 'express';
import { baseUrl } from './config/api';
import db from './config/database';
import apiRouter from './routes';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port,
    baseUrl,
    mongo: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
    dbState: db.readyState
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
