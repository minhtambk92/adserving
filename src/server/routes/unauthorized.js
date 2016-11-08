/**
 * Created by Manhhailua on 10/31/16.
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../../config';
import passport from '../authentications/local';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.initialize());

router.post('/test', (req, res) => res.send({ title: 'Just a test route!' }));

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }

    // Set user cookie
    if (req.body.rememberMe === 'true') {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    }

    return res.json({
      data: {
        loggedInUser: req.user,
      },
    });
  }
);

router.post('/logout', (req, res) => {
  if (!req.cookies.id_token) {
    return res.sendStatus(403);
  }

  res.clearCookie('id_token');

  return res.sendStatus(202);
});

export default router;
