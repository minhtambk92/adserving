/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ChannelType from '../types/ChannelType';
import { Channel } from '../models';

const channels = {
  type: new List(ChannelType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Channel, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default channels;