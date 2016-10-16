/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Zone from './Zone';

export default {

  path: '/zone/:id',

  async action({ params }) {
    return {
      title: 'Zone Management | Admin Dev Kit',
      component: <Zone zoneId={params.id} />,
    };
  },

};
