/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import General from './General';

export default {

  path: '/pages/UI/general',

  action() {
    return {
      title: 'General UI | Admin Dev Kit',
      component: <General />,
    };
  },

};
