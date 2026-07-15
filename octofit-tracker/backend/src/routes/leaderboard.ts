import { Router } from 'express';

import { baseUrl } from '../config/api';

const leaderboardRouter = Router();

leaderboardRouter.get('/', (_req, res) => {
  res.json({
    resource: 'leaderboard',
    items: [],
    links: {
      self: `${baseUrl}/api/leaderboard/`
    }
  });
});

export default leaderboardRouter;
