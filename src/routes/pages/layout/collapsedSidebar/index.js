/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import CollapsedSidebar from './CollapsedSidebar';

export default {

  path: '/pages/layout/collapsed-sidebar',

  action() {
    return {
      title: 'Collapsed Sidebar | Admin Dev Kit',
      component: <CollapsedSidebar />,
    };
  },

};
