/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ChannelType from '../../types/channel/ChannelType';
import { Channel } from '../../models';

const channels = {
  type: new List(ChannelType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Channel, {
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

export default channels;
