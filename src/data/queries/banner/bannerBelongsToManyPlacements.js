/**
 * Created by Manhhailua on 10/25/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Banner } from '../../models';
import PlacementType from '../../types/placement/PlacementType';

const bannerBelongsToManyPlacements = () => ({
  type: new List(PlacementType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Banner.placements, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerBelongsToManyPlacements;
