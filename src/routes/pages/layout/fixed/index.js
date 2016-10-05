/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Fixed from './Fixed';

export default {

  path: '/pages/layout/fixed',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Fixed Layout | Admin Dev Kit',
      pageTitle: 'Fixed Layout',
      pageSubTitle: 'Blank example to the fixed layout',
    };

    return {
      title: content.title,
      component: <Fixed content={content} />,
    };
  },

};
