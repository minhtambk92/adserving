import { resolver, defaultListArgs } from 'graphql-sequelize';
import { ClickImpression } from '../models';
import BannerType from '../types/BannerType';

const clickImpressionBelongsToBanner = () => ({
  type: BannerType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ClickImpression.banner, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default clickImpressionBelongsToBanner;
