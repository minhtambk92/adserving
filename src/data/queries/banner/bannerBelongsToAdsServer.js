/**
 * Created by Quy on 11/15/2016.
 */
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Banner } from '../../models';
import AdsServerType from '../../types/adsServer/AdsServerType';

const bannerBelongsToAdsServer = () => ({
  type: AdsServerType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Banner.adsServer, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerBelongsToAdsServer;

