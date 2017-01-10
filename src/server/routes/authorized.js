/**
 * Created by Manhhailua on 10/31/16.
 */

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import moment from 'moment';
import jsBeautify from 'js-beautify';
import { host, rootPath } from '../../config';

const router = express.Router(); // eslint-disable-line new-cap
const uploadsFolderName = 'uploads';
const now = moment();

// Init multer storage
const storage = multer.diskStorage({
  destination: path.join(
    rootPath, 'build/public', uploadsFolderName, now.format('YYYY'), now.format('MM'),
  ),
  filename(req, file, cb) {
    const link = `${file.originalname.slice(0, 4).toString()}-${Date.now()}.jpeg`;
    cb(null, link);
  },
});
const upload = multer({ storage });

// Handle upload request
router.post('/upload-banner', upload.single('file'), (req, res) => {
  if (req.file && req.file.originalname) {
    fs.chownSync(req.file.path, 1002, 1002);
    const imageUrl = `http://${host}/${uploadsFolderName}/${now.format('YYYY')}/${now.format('MM')}/${req.file.filename}`;
    res.send(imageUrl);
  }
});

// Handle zone data rendering
router.post('/core-js', async (req, res) => {
  const coreJsFolderName = 'corejs';
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);
  const zoneId = encodeURI(req.body.zoneId);
  const coreResponse = await fetch(encodeURI(req.body.templateFileUrl));
  let coreContent = await coreResponse.text();

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
            bannerType {
              id
              name
              value
              weight
            }
            imageUrl
            url
            target
            adServer
            bannerHtmlType {
              id
              name
              value
              weight
            }
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

  // Create file path
  const zoneData = await zoneResponse.json();
  const coreName = `arf-${zoneId}.min.js`;
  const builtCoreFile = path.join(builtCorePath, coreName);

  // Replace template holder zone object by real zone object
  if (coreContent.indexOf('"{{zoneDataObject}}"') > -1) {
    coreContent = coreContent.replace('"{{zoneDataObject}}"', JSON.stringify(zoneData));
  } else {
    coreContent = coreContent.replace('\'{{zoneDataObject}}\'', JSON.stringify(zoneData));
  }

  // Replace template holder zone id by real zone id
  coreContent = coreContent.replace(/\{\{zoneId}}/g, zoneId);

  // Write file
  fs.writeFileSync(builtCoreFile, coreContent); // Write content to file
  fs.chmodSync(builtCoreFile, 0o644); // Chmod to 644

  const outputCode = `
    <!-- Ads Zone -->
    <zone id="${zoneId}"></zone>
    <script src="//${host}/${coreJsFolderName}/arf-${zoneId}.min.js"></script>
    <!-- / Ads Zone -->
  `;

  res.send(jsBeautify.html(outputCode));
});

// Handle multiple zone data rendering
router.post('/bulk-core-js', async (req, res) => {
  const coreJsFolderName = 'corejs';
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);
  const coreResponse = await fetch(encodeURI(req.body.templateFileUrl));
  const coreContent = await coreResponse.text();
  const coreName = `arf-${'test'}.min.js`;
  const builtCoreFile = path.join(builtCorePath, coreName);

  // Core file
  const writableStream = fs.createWriteStream(builtCoreFile);

  writableStream.write(coreContent);
  writableStream.end();

  writableStream.on('finish', () => {
    res.send('DONE BULK WRITE!');
  });

  writableStream.on('error', (error) => {
    res.send(error.stack);
  });
});

export default router;
