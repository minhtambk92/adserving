import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import PlacementBannerZoneType from '../../types/placementBannerZone/PlacementBannerZoneType';
import { PlacementBannerZone } from '../models';

const placementBannerZones = {
  type: new List(PlacementBannerZoneType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
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

