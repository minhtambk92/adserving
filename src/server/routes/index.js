/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';
import multer from 'multer';
import fs from 'fs';
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

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    const link = `${file.originalname.slice(0, 4).toString()}-${Date.now()}.jpeg`;
    cb(null, link);
  },
});

const upload = multer({ storage });
router.post('/uploadBanner', upload.single('file'), (req, res) => {
  if (req.file && req.file.originalname) {
    fs.chownSync(req.file.path, 1002, 1002);
    res.send(req.file.path);
  }
});

export default router;
