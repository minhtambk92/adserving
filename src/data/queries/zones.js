/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ZoneType from '../types/ZoneType';
import { Zone } from '../models';

const zones = () => ({
  type: new List(ZoneType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Zone, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default zones;
