/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import PlacementType from '../types/PlacementType';
import { Placement } from '../models';

const placements = () => ({
  type: new List(PlacementType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Placement, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placements;

