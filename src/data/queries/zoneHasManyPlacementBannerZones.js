import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Zone } from '../models';
import PlacementBannerZoneType from '../types/PlacementBannerZoneType';

const zoneHasManyPlacementBanerZones = () => ({
  type: new List(PlacementBannerZoneType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Zone.placementBannerZones, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default zoneHasManyPlacementBanerZones;
