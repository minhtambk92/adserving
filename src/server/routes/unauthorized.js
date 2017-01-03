/**
 * Created by Manhhailua on 10/31/16.
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import { auth, host, rootPath } from '../../config';
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
  },
);

router.post('/logout', (req, res) => {
  if (!req.cookies.id_token) {
    return res.sendStatus(403);
  }

  res.clearCookie('id_token');

  return res.sendStatus(202);
});

router.post('/core-js', async(req, res) => {
  const coreJsFolderName = 'corejs';
  const corePath = path.join(rootPath, `public/${coreJsFolderName}`);
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);
  const zoneId = req.body.zoneId;
  const coreResponse = await fetch(req.body.templateFileUrl);
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

  coreContent = coreContent.replace('{{zoneId}}', zoneId);

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

  res.send(outputCode.trim());
});

export default router;
