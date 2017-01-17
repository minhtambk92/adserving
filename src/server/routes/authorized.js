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
import { Zone, Share, Placement, Banner } from '../../data/models';

const router = express.Router(); // eslint-disable-line new-cap
const uploadsFolderName = 'uploads';

// Init multer storage
const storage = multer.diskStorage({
  destination: path.join(
    rootPath, 'build/public', uploadsFolderName, moment().format('YYYY'), moment().format('MM'),
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
    const imageUrl = `http://${host}/${uploadsFolderName}/${moment().format('YYYY')}/${moment().format('MM')}/${req.file.filename}`;
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
      zoneType {
        id
        name
        isSize
        value
      }
      zoneSizeType {
        id
        name
        width
        height
        status
      }
      html
      css
      slot
      width
      height
      isCustomSize
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
            adsServer {
              id
              name
              value
              status
            }
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
  const io = req.app.get('io');
  const zoneQuantity = await Zone.count();

  // Emit start point
  io.sockets.emit('start-bulk-export-zone-data', { zoneQuantity });

  const coreJsFolderName = 'corejs';
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);
  const coreResponse = await fetch(encodeURI(req.body.templateFileUrl));
  const templateZoneCode = await coreResponse.text();

  const allZones = await Zone.findAll({
    include: [{
      model: Share,
      as: 'shares',
    }],
  });

  let writableStream = null;

  allZones.forEach((zone, index) => {
    const coreName = `arf-${zone.id}.min.js`;
    const builtCoreFile = path.join(builtCorePath, coreName);
    let currentZoneCode = templateZoneCode;

    writableStream = fs.createWriteStream(builtCoreFile);

    // Replace template holder zone object by real zone object
    if (currentZoneCode.indexOf('"{{zoneDataObject}}"') > -1) {
      currentZoneCode = currentZoneCode.replace('"{{zoneDataObject}}"', JSON.stringify(zone));
    } else {
      currentZoneCode = currentZoneCode.replace('\'{{zoneDataObject}}\'', JSON.stringify(zone));
    }

    // Replace template holder zone id by real zone id
    currentZoneCode = currentZoneCode.replace(/\{\{zoneId}}/g, zone.id);

    writableStream.write(currentZoneCode);
    writableStream.end();

    writableStream.on('finish', () => {
      // Emit progress
      io.sockets.emit('run-bulk-export-zone-data', {
        index: index + 1, // Prevent index 0
        zone,
      });

      if (index === allZones.length - 1) {
        // Emit end point
        io.sockets.emit('done-bulk-export-zone-data');
      }
    });

    writableStream.on('error', (error) => {
      // Emit error point
      io.sockets.emit('error-bulk-export-zone-data', { error });
    });
  });

  res.sendStatus(200);
});

export default router;
