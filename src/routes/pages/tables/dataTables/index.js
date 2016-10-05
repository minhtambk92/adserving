/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import DataTables from './DataTables';

export default {

  path: '/pages/tables/data',

  action() {
    let content = { // eslint-disable-line prefer-const
      title: 'Data Tables | Admin Dev Kit',
      pageTitle: 'Data Tables',
      pageSubTitle: 'advanced tables',
    };

    return {
      title: content.title,
      component: <DataTables content={content} />,
    };
  },

};
