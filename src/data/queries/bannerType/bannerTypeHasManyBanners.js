/**
 * Created by Quy on 11/15/2016.
 */
import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { BannerType } from '../../models';
import BType from '../../types/banner/BannerType';

const bannerTypeHasManyBanners = () => ({
  type: new List(BType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(BannerType.banners, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerTypeHasManyBanners;
