/**
 * Created by Quy on 11/15/2016.
 */
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Banner } from '../../models';
import BannerHtmlTypeType from '../../types/bannerHtmlType/BannerHtmlTypeType';

const bannerBelongsToBannerHtmlType = () => ({
  type: BannerHtmlTypeType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Banner.bannerHtmlType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerBelongsToBannerHtmlType;

