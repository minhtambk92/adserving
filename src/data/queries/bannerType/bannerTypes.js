/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import BannerTypeType from '../../types/bannerType/BannerTypeType';
import { BannerType } from '../../models';

const bannerTypes = {
  type: new List(BannerTypeType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(BannerType, {
    before(options, args, res) {
      const opts = options;
      if (res.body !== undefined) {
        opts.where = res.body.variables;
      }
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default bannerTypes;
