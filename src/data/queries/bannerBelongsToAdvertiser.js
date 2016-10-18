import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Banner } from '../models';
import AdvertiserType from '../types/AdvertiserType';

const bannerBelongsToAdvertiser = () => ({
  type: AdvertiserType,
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Banner.advertiser, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerBelongsToAdvertiser;
