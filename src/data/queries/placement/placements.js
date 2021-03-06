/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import PlacementType from '../../types/placement/PlacementType';
import { Placement } from '../../models';

const placements = {
  type: new List(PlacementType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Placement, {
    before(options, args, res) {
      const opts = options;
      opts.where = res.body.variables;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default placements;

