/**
 * Created by Quy on 11/15/2016.
 */
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Banner } from '../../models';
import BannerTypeType from '../../types/bannerType/BannerTypeType';

const bannerBelongsToBannerType = () => ({
  type: BannerTypeType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Banner.bannerType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerBelongsToBannerType;

