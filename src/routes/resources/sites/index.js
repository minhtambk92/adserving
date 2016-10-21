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
import Sites from './Sites';

export default {

  path: '/site',

  children: [
    require('./site').default,
  ],

  async action() {
    return {
      title: 'Sites Management | Admin Dev Kit',
      component: <Sites />,
    };
  },

};
/* eslint-disable global-require */