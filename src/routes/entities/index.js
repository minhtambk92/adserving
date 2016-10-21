/**
 * Created by Manhhailua on 10/20/16.
 */

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/entity',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./advertiser').default,
    require('./banner').default,
    require('./campaign').default,
    require('./placement').default,
    require('./site').default,
    require('./user').default,
    require('./zone').default,
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);

    return route;
  },

};
