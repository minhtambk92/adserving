/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';

const middleware = express();

middleware.use((req, res, next) => {
  // Your handling goes here

  next();
});

export default middleware;
