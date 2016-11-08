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
import Resources from './Resources';

export default {

  path: '/',

  children: [
    {
      path: '/',
      async action() {
        return {
          title: 'Resource Types Management | Admin Dev Kit',
          component: <Resources />,
        };
      },
    },
    require('./resource').default,
  ],

};

/* eslint-disable global-require */
