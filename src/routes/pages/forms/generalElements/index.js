/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import GeneralElements from './GeneralElements';

export default {

  path: '/pages/forms/general',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'General Form Elements | Admin Dev Kit',
      pageTitle: 'General Form Elements',
      pageSubTitle: 'Preview',
    };

    return {
      title: content.title,
      component: <GeneralElements content={content} />,
    };
  },

};
