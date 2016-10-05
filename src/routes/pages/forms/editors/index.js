/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Editors from './Editors';

export default {

  path: '/pages/forms/editors',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Editors | Admin Dev Kit',
      pageTitle: 'Text Editors',
      pageSubTitle: 'Advanced form element',
    };

    return {
      title: content.title,
      component: <Editors content={content} />,
    };
  },

};
