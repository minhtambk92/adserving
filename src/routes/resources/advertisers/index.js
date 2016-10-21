/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
import React from 'react';
import Advertisers from './Advertisers';

export default {

  path: '/advertiser',

  children: [
    {
      path: '/',
      async action() {
        return {
          title: 'Sites Management | Admin Dev Kit',
          component: <Advertisers />,
        };
      },
    },
    require('./advertiser').default,
  ],

};
/* eslint-disable global-require */
