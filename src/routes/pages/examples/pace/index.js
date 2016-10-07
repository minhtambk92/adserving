/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Pace from './Pace';

export default {

  path: '/pages/examples/pace',

  action() {
    return {
      title: 'Pace page | Admin Dev Kit',
      component: <Pace />,
    };
  },

};
