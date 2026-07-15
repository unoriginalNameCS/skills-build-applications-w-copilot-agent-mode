import { Router } from 'express';

import { baseUrl } from '../config/api';

const teamsRouter = Router();

teamsRouter.get('/', (_req, res) => {
  res.json({
    resource: 'teams',
    items: [],
    links: {
      self: `${baseUrl}/api/teams/`
    }
  });
});

export default teamsRouter;
