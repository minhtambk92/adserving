/**
 * Created by Manhhailua on 10/20/16.
 */

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/resource',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./advertisers').default,
    require('./banners').default,
    require('./campaigns').default,
    require('./placements').default,
    require('./sites').default,
    require('./roles').default,
    require('./users').default,
    require('./zones').default,
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
