/**
 * Created by Manhhailua on 10/31/16.
 */

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import jsBeautify from 'js-beautify';
import { host, rootPath } from '../../config';

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


router.post('/core-js', async (req, res) => {
  const coreJsFolderName = 'corejs';
  const corePath = path.join(rootPath, `public/${coreJsFolderName}`);
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);
  const zoneId = encodeURI(req.body.zoneId);
  const coreResponse = await fetch(encodeURI(req.body.templateFileUrl));
  let coreContent = await coreResponse.text();

  // Create {rootPath}/public/corejs folder if it is not existed
  if (!fs.existsSync(corePath)) {
    fs.mkdirSync(corePath, 0o755);
  }

  // Create {rootPath}/build/public/corejs folder if it is not existed
  if (!fs.existsSync(builtCorePath)) {
    fs.mkdirSync(builtCorePath, 0o755);
  }

  const zoneResponse = await fetch(`http://${host}/graphql?query={
    zones(where: {id: "${zoneId}"}, limit: 1) {
      id
      name
      description
      type
      html
      css
      slot
      width
      height
      shares {
        id
        name
        html
        css
        outputCss
        width
        height
        weight
        classes
        type
        placements {
          id
          name
          description
          width
          height
          weight
          startTime
          endTime
          status
          banners {
            id
            name
            html
            width
            height
            keyword
            weight
            description
            type
            imageUrl
            url
            target
            adServer
            bannerHTMLType
            isIFrame
            isCountView
            isFixIE
            isDefault
            tracks {
              id
              clickUrl
              impressionUrl
            }
          }
        }
      }
    }
  }`);

  const zoneData = await zoneResponse.json();
  const coreName = `arf-${zoneId}.min.js`;
  const coreFile = path.join(corePath, coreName);
  const builtCoreFile = path.join(builtCorePath, coreName);

  if (coreContent.indexOf('"{{zoneDataObject}}"') > -1) {
    coreContent = coreContent.replace('"{{zoneDataObject}}"', JSON.stringify(zoneData));
  } else {
    coreContent = coreContent.replace('\'{{zoneDataObject}}\'', JSON.stringify(zoneData));
  }

  coreContent = coreContent.replace(/\{\{zoneId}}/g, zoneId);

  fs.writeFileSync(coreFile, coreContent); // Write content to file
  fs.chmodSync(coreFile, 0o644); // Chmod to 644
  fs.writeFileSync(builtCoreFile, coreContent); // Copy to build/public folder
  fs.chmodSync(builtCoreFile, 0o644); // Chmod to 644

  const outputCode = `
    <!-- Ads Zone -->
    <zone id="${zoneId}"></zone>
    <script src="//${host}/${coreJsFolderName}/arf-${zoneId}.min.js"></script>
    <!-- / Ads Zone -->
  `;

  res.send(jsBeautify.html(outputCode));
});

export default router;
