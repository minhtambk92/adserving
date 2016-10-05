/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Read from './Read';

export default {

  path: '/pages/mailbox/read',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Read | Admin Dev Kit',
      pageTitle: 'Read',
      pageSubTitle: '13 new messages',
    };

    return {
      title: content.title,
      component: <Read content={content} />,
    };
  },

};
