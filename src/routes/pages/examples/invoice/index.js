/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Invoice from './Invoice';

export default {

  path: '/pages/examples/invoice',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Invoice | Admin Dev Kit',
      pageTitle: 'Invoice',
      pageSubTitle: '#007612',
    };

    return {
      title: content.title,
      component: <Invoice content={content} />,
    };
  },

};
