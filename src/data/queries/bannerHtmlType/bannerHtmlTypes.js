/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import BannerHtmlTypeType from '../../types/bannerHtmlType/BannerHtmlTypeType';
import { BannerHtmlType } from '../../models';

const bannerHtmlTypes = {
  type: new List(BannerHtmlTypeType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(BannerHtmlType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default bannerHtmlTypes;