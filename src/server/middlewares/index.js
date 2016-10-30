/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';

const middleware = express();

middleware.use(/^\/((?!(login|register)$).)*$/, (req, res, next) => {
  // Check user token for user login state
  if (!req.cookies.id_token) {
    return res.redirect('/login');
  }

  return next();
});

export default middleware;
