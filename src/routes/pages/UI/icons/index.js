/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Icons from './Icons';

export default {

  path: '/pages/UI/icons',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Icons | Admin Dev Kit',
      pageTitle: 'Icons',
      pageSubTitle: 'a set of beautiful icons',
    };

    return {
      title: content.title,
      component: <Icons content={content} />,
    };
  },

};
