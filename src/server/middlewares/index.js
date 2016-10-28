/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';

const middleware = express();

middleware.use((req, res, next) => {
  // Your handling goes here
  console.log('Successfully import middleware!'); // eslint-disable-line no-console

  next();
});

export default middleware;
