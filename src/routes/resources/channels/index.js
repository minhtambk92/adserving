/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import Layout from '../../../components/Layout';
import Channels from './Channels';

const title = 'Channels';

export default {

  path: '/channel',

  children: [
    {
      path: '/',
      async action() {
        return {
          title,
          component: <Layout pageTitle={title} pageSubTitle="Control panel"><Channels /></Layout>,
        };
      },
    },
    require('./channel').default,
  ],

};
