/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Role from './Role';

export default {

  path: '/:id',

  async action({ params }) {
    return {
      title: 'Role Management',
      component: <Role roleId={params.id} />,
    };
  },

};
