/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import Layout from '../../../components/Layout';
import Advertisers from './Advertisers';

const title = 'Home';

export default {

  path: '/advertiser',

  children: [
    {
      path: '/',
      async action() {
        return {
          title,
          component: (
            <Layout pageTitle={title} pageSubTitle="Control panel"><Advertisers /></Layout>
          ),
        };
      },
    },
    require('./advertiser').default,
  ],

};
