/**
 * Created by Manhhailua on 10/31/16.
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import fs from 'fs';
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
  },
);

router.post('/logout', (req, res) => {
  if (!req.cookies.id_token) {
    return res.sendStatus(403);
  }

  res.clearCookie('id_token');

  return res.sendStatus(202);
});

router.post('/core-js', async (req, res) => {
  const zoneId = req.body.zoneId;
  const coreResponse = await fetch('http://corejs.manhhailua.com/build/Library.min.js');
  let coreContent = await coreResponse.text();

  const zoneResponse = await fetch(`http://rsk.quynd.com/graphql?query={
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
  const coreFile = `/home/nginx/domains/static.manhhailua.com/public/corejs/${coreName}`;

  coreContent = coreContent.replace('"{{zoneDataObject}}"', JSON.stringify(zoneData));
  coreContent = coreContent.replace('{{zoneId}}', zoneId);

  fs.writeFileSync(coreFile, coreContent); // Write content to file
  fs.chmodSync(coreFile, 0o644); // Chmod to 644

  res.send(`
    <!-- Ads Zone -->
    <zone id="${zoneId}"></zone>
    <script src="//static.manhhailua.com/corejs/arf-${zoneId}.min.js"></script>
    <!-- / Ads Zone -->
  `);
});

export default router;
