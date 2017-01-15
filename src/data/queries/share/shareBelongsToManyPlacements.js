/**
 * Created by Manhhailua on 10/25/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Share } from '../../models';
import PlacementType from '../../types/placement/PlacementType';

const shareBelongsToManyPlacements = () => ({
  type: new List(PlacementType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Share.placements, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default shareBelongsToManyPlacements;
