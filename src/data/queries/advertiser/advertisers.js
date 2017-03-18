/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import AdvertiserType from '../../types/advertiser/AdvertiserType';
import { Advertiser } from '../../models';

const advertisers = {
  type: new List(AdvertiserType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Advertiser, {
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

export default advertisers;
