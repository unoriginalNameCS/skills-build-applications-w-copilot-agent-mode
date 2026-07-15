import { Router } from 'express';

import { baseUrl } from '../config/api';

const activitiesRouter = Router();

activitiesRouter.get('/', (_req, res) => {
  res.json({
    resource: 'activities',
    items: [],
    links: {
      self: `${baseUrl}/api/activities/`
    }
  });
});

export default activitiesRouter;
