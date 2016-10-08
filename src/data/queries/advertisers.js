/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import AdvertiserType from '../types/AdvertiserType';
import { Advertiser } from '../models';

const advertisers = {
  type: new List(AdvertiserType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Advertiser, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default advertisers;
