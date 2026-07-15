import express from 'express';
import db from './config/database';
import apiRouter from './routes';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

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
