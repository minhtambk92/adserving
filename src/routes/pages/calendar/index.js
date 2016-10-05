/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Calendar from './Calendar';

export default {

  path: '/pages/calendar',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Calendar | Admin Dev Kit',
      pageTitle: 'Calendar',
      pageSubTitle: 'Control panel',
    };

    return {
      title: content.title,
      component: <Calendar content={content} />,
    };
  },

};
