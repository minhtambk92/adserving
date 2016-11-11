/**
 * Created by Manhhailua on 11/11/16.
 */

/* eslint-disable global-require */

import React from 'react';
import Menus from './Menus';

export default {

  path: '/menus',

  children: [{
    path: '/',
    async action() {
      return {
        title: 'Menus Management | Admin Dev Kit',
        component: <Menus />,
      };
    },
  }],

};

/* eslint-disable global-require */
