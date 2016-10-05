/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import SimpleTables from './SimpleTables';

export default {

  path: '/pages/tables/simple',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Simple Tables | Admin Dev Kit',
      pageTitle: 'Simple Tables',
      pageSubTitle: 'preview of simple tables',
    };

    return {
      title: content.title,
      component: <SimpleTables content={content} />,
    };
  },

};
