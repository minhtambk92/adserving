import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Track } from '../../models';
import BannerType from '../../types/banner/BannerType';

const trackBelongsToBanner = () => ({
  type: BannerType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Track.banner, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default trackBelongsToBanner;
