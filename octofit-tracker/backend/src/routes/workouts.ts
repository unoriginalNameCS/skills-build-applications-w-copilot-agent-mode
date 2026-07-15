import { Router } from 'express';

import { baseUrl } from '../config/api';

const workoutsRouter = Router();

workoutsRouter.get('/', (_req, res) => {
  res.json({
    resource: 'workouts',
    items: [],
    links: {
      self: `${baseUrl}/api/workouts/`
    }
  });
});

export default workoutsRouter;
