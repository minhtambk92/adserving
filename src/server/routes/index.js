/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { auth } from '../../config';
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

const storage = multer.diskStorage({
  destination: '/home/nginx/domains/static.manhhailua.com/public/uploads/',
  filename(req, file, cb) {
    const link = `${file.originalname.slice(0, 4).toString()}-${Date.now()}.jpeg`;
    cb(null, link);
  },
});

const upload = multer({ storage });
router.post('/upload-banner', upload.single('file'), (req, res) => {
  if (req.file && req.file.originalname) {
    fs.chownSync(req.file.path, 1002, 1002);
    const imageUrl = `http://static.manhhailua.com/uploads/${req.file.filename}`;
    res.send(imageUrl);
  }
});

export default router;
