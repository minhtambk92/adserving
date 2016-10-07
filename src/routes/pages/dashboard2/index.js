/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Dashboard2 from './Dashboard2';
import fetch from '../../../core/fetch';

export default {

  path: '/dashboard2',

  async action() {
    return {
      title: 'Home 2 | Admin Dev Kit',
      component: <Dashboard2 />,
    };
  },

};
