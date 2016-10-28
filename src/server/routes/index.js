/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/test', (req, res) => {
  // Your handling goes here
  console.log('Successfully import routes!'); // eslint-disable-line no-console

  res.send({ title: 'Express' });
});

export default router;
