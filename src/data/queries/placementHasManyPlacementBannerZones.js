import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Placement } from '../models';
import PlacementBannerZoneType from '../types/PlacementBannerZoneType';

const placementHasManyPlacementBannerZones = () => ({
  type: new List(PlacementBannerZoneType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Placement.placementBannerZones, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementHasManyPlacementBannerZones;
