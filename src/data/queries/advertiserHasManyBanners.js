import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Advertiser } from '../models';
import BannerType from '../types/BannerType';

const advertiserHasManyBanners = () => ({
  type: new List(BannerType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Advertiser.banners, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default advertiserHasManyBanners;
