/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';
import { unauthorizedRoutes, authorizedRoutes } from '../routes';

const middleware = express();

middleware.use(unauthorizedRoutes);

middleware.use(/^\/((?!(login|register|logout)$).)*$/, (req, res, next) => {
  // Check user token for user login state
  if (!req.cookies.id_token) {
    return res.redirect('/login');
  }

  return next();
});

middleware.use(authorizedRoutes);

export default middleware;
