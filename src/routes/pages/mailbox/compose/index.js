/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Compose from './Compose';

export default {

  path: '/pages/mailbox/compose',

  action() {
    return {
      title: 'Compose | Admin Dev Kit',
      component: <Compose />,
    };
  },

};
