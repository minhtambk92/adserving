/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Boxed from './Boxed';

export default {

  path: '/pages/layout/boxed',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Boxed Layout | Admin Dev Kit',
      pageTitle: 'Boxed Layout',
      pageSubTitle: 'Blank example to the boxed layout',
    };

    return {
      title: content.title,
      component: <Boxed content={content} />,
    };
  },

};
