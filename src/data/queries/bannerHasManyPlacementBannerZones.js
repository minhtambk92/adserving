import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Banner } from '../models';
import PlacementBannerZoneType from '../types/PlacementBannerZoneType';

const bannerHasManyPlacementBannerZones = () => ({
  type: new List(PlacementBannerZoneType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Banner.placementbannerzones, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerHasManyPlacementBannerZones;
