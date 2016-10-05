/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import LockScreen from './LockScreen';

export default {

  path: '/pages/examples/lockscreen',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Lock Screen | Admin Dev Kit',
    };

    return {
      title: content.title,
      component: <LockScreen content={content} />,
    };
  },

};
