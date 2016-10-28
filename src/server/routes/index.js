/**
 * Created by Manhhailua on 10/28/16.
 */

import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/test', (req, res) => {
  // Your handling goes here
  console.log('Successfully import routes!'); // eslint-disable-line no-console

  res.send({ title: 'Express' });
});

/* eslint-disable object-shorthand */
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    const link = file.originalname.slice(0, 4).toString() + Date.now() + '.jpeg';
    cb(null, link);
  },
});
const upload = multer({ storage: storage });
router.post('/uploadBanner', upload.single('file'), (req, res) => {
  if (req.file && req.file.originalname) {
    fs.chownSync(req.file.path, 1002, 1002);
    res.send(req.file.path);
  }
});
/* eslint-enable object-shorthand */

export default router;
