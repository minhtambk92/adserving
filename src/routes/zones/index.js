/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Zones from './Zones';

export default {

  path: '/zones',

  async action() {
    return {
      title: 'Zones Management | Admin Dev Kit',
      component: <Zones />,
    };
  },

};
