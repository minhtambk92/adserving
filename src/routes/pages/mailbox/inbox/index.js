/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Inbox from './Inbox';

export default {

  path: '/pages/mailbox/inbox',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Mailbox | Admin Dev Kit',
      pageTitle: 'Mailbox',
      pageSubTitle: '13 new messages',
    };

    return {
      title: content.title,
      component: <Inbox content={content} />,
    };
  },

};
