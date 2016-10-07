/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Sliders from './Sliders';

export default {

  path: '/pages/UI/sliders',

  action() {
    return {
      title: 'UI Sliders | Admin Dev Kit',
      component: <Sliders />,
    };
  },

};
