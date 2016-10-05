/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Blank from './Blank';

export default {

  path: '/pages/examples/blank',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Blank page | Admin Dev Kit',
      pageTitle: 'Blank page',
      pageSubTitle: 'it all starts here',
    };

    return {
      title: content.title,
      component: <Blank content={content} />,
    };
  },

};
