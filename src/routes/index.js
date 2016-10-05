/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,

    // admin-lte routes
    require('./pages/dashboard').default,
    require('./pages/dashboard2').default,

    require('./pages/layout/boxed').default,
    require('./pages/layout/collapsedSidebar').default,
    require('./pages/layout/fixed').default,
    require('./pages/layout/topNav').default,

    require('./pages/widgets').default,

    require('./pages/charts/chartjs').default,
    require('./pages/charts/morris').default,
    require('./pages/charts/flot').default,
    require('./pages/charts/inline').default,

    require('./pages/UI/buttons').default,
    require('./pages/UI/general').default,
    require('./pages/UI/icons').default,
    require('./pages/UI/modals').default,
    require('./pages/UI/sliders').default,
    require('./pages/UI/timeline').default,

    require('./pages/forms/advancedElements').default,
    require('./pages/forms/editors').default,
    require('./pages/forms/generalElements').default,

    require('./pages/tables/simpleTables').default,
    require('./pages/tables/dataTables').default,

    require('./pages/calendar').default,

    require('./pages/mailbox/inbox').default,
    require('./pages/mailbox/compose').default,
    require('./pages/mailbox/read').default,

    require('./pages/examples/404').default,
    require('./pages/examples/500').default,
    require('./pages/examples/blank').default,
    require('./pages/examples/invoice').default,
    require('./pages/examples/lockScreen').default,
    require('./pages/examples/login').default,
    require('./pages/examples/pace').default,
    require('./pages/examples/profile').default,
    require('./pages/examples/register').default,

    // place new routes before...
    require('./notFound').default,
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
    route.description = route.description || '';

    return route;
  },

};
