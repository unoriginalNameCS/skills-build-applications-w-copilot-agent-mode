import { Router } from 'express';

import { baseUrl } from '../config/api';

const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  res.json({
    resource: 'users',
    items: [],
    links: {
      self: `${baseUrl}/api/users/`
    }
  });
});

export default usersRouter;
