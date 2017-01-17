/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Home from './Home';

const title = 'Home';
const subTitle = 'Control panel';

export default {

  path: '/',

  action() {
    return {
      title: `${title} | Admin Dev Kit`,
      component: <Layout pageTitle={title} pageSubTitle={subTitle}><Home /></Layout>,
    };
  },

};
