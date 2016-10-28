/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';
import passport from '../authentications/local';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.initialize());

router.get('/test', (req, res) => {
  // Your handling goes here

  res.send({ title: 'Express' });
});


router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }

    return res.json(req.user);
  }
);

export default router;
