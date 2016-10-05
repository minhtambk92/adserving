/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Flot from './Flot';

export default {

  path: '/pages/charts/flot',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Flot Charts | Admin Dev Kit',
      pageTitle: 'Flot Charts',
      pageSubTitle: 'Preview sample',
    };

    return {
      title: content.title,
      component: <Flot content={content} />,
    };
  },

};
