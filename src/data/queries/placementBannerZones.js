import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import PlacementBannerZoneType from '../types/PlacementBannerZoneType';
import { PlacementBannerZone } from '../models';

const placementBannerZones = {
  type: new List(PlacementBannerZoneType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(PlacementBannerZone, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default placementBannerZones;

