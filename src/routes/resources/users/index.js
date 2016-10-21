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
import Users from './Users';

export default {

  path: '/user',

  children: [
    require('./user').default,
  ],

  async action() {
    return {
      title: 'Users Management | Admin Dev Kit',
      component: <Users />,
    };
  },

};
/* eslint-disable global-require */
