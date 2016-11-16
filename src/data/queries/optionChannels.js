/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import OptionChannelType from '../types/OptionChannelType';
import { OptionChannel } from '../models';

const optionChannels = {
  type: new List(OptionChannelType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannel, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default optionChannels;
