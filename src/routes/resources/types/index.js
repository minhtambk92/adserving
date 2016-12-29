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
import Resources from './Resources';
import fetch from '../../../core/fetch';

// Init parent component
let TypeComponent = {};

// Requires and returns all modules that match
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

// Is an array containing all the matching modules
const types = requireAll(require.context('.', true, /^(\.\/type-)[\w/]*(index)$/i));

// Fetch through all modules then add them to an object as parent component
types.forEach(type => {
  if (type.default) {
    // Default export
    // eslint-disable-next-line no-console
    console.warn('Default export is not currently supported by dynamic components require ' +
      'feature. Component with default export will not be imported by the CMS. Please use named ' +
      'exports instead.');
  } else {
    // Normal export (Object exported)
    TypeComponent = Object.assign(TypeComponent, type);
  }
});

export default {

  path: '/type',

  children: [
    // All resources list
    {
      path: '/',
      async action() {
        return {
          title: 'Resource Types Management | Admin Dev Kit',
          component: <Resources />,
        };
      },
    },
    // Resource entity page
    {
      path: '/:id',
      async action({ params }) {
        // Fetch current type id
        const resp = await fetch('/graphql', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `{
              resources(where: {id: "${params.id}"}, limit: 1) {
                id
                uniqueName
              }
            }`,
          }),
          credentials: 'include',
        });

        const { data } = await resp.json();

        if (!data || !data.resources || data.resources.length === 0) {
          throw new Error('Failed to load resource.');
        }

        const resource = data.resources.pop();
        const name = resource.uniqueName.replace(
          /\w\S*/g,
          str => str.charAt(0).toUpperCase() + str.substr(1),
        );

        return {
          title: `Resource Management | Type: ${resource.uniqueName}`,
          component: React.createElement(TypeComponent[name], {
            resourceId: resource.id,
          }),
        };
      },
    },
  ],

};
