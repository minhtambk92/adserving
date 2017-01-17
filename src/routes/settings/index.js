/**
 * Created by Manhhailua on 10/20/16.
 */

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/setting',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./appearance').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    return route;
  },

};
