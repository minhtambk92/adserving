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
import Placements from './Placements';

export default {

  path: '/placement',

  children: [
    require('./placement').default,
  ],

  async action() {
    return {
      title: 'Placements Management | Admin Dev Kit',
      component: <Placements />,
    };
  },

};
/* eslint-disable global-require */
