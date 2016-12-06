import { resolver, defaultListArgs } from 'graphql-sequelize';
import { PlacementBanner } from '../../models';
import BannerType from '../../types/banner/BannerType';

const placementBannerBelongsToBanner = () => ({
  type: BannerType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(PlacementBanner.banner, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementBannerBelongsToBanner;
