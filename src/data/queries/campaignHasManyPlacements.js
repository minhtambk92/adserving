import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Campaign } from '../models';
import PlacementType from '../types/PlacementType';

const campaignHasManyPlacements = () => ({
  type: new List(PlacementType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Campaign.placements, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default campaignHasManyPlacements;
