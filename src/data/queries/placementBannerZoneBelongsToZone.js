import { resolver, defaultListArgs } from 'graphql-sequelize';
import { PlacementBannerZone } from '../models';
import ZoneType from '../types/ZoneType';

const placementBannerZoneBelongsToZone = () => ({
  type: ZoneType,
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(PlacementBannerZone.zone, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementBannerZoneBelongsToZone;
