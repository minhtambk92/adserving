/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import BannerType from '../types/BannerType';
import { Banner } from '../models';

const banners = {
  type: new List(BannerType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Banner, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default banners;
