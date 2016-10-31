/**
 * Created by Manhhailua on 10/31/16.
 */

import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router(); // eslint-disable-line new-cap

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
