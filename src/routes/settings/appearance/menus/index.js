/**
 * Created by Manhhailua on 11/11/16.
 */

import React from 'react';
import Layout from '../../../../components/Layout';
import Menus from './Menus';

const title = 'Menus Management';

export default {

  path: '/menu',

  children: [{
    path: '/',
    async action() {
      return {
        title,
        component: (
          <Layout pageTitle={title} pageSubTitle="Control panel"><Menus /></Layout>
        ),
      };
    },
  }],

};
