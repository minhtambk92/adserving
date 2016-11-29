import { resolver, defaultListArgs } from 'graphql-sequelize';
import { PlacementBannerZone } from '../../models';
import BannerType from '../../types/banner/BannerType';

const placementBannerZoneBelongsToBanner = () => ({
  type: BannerType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(PlacementBannerZone.banner, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementBannerZoneBelongsToBanner;
