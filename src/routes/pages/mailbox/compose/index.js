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
    let content = { // eslint-disable-line prefer-const
      title: 'Compose | Admin Dev Kit',
      pageTitle: 'Compose',
      pageSubTitle: 'write new email',
    };

    return {
      title: content.title,
      component: <Compose content={content} />,
    };
  },

};
