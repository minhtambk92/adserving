/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Page500 from './500';

export default {

  path: '/pages/examples/500',

  action() {
    return {
      title: '500 Error | Admin Dev Kit',
      component: <Page500 />,
    };
  },

};
