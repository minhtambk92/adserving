/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ChannelOptionCategoryType from '../../types/channelOptionCategory/ChannelOptionCategoryType';
import { ChannelOptionCategory } from '../../models';

const channelOptionCategories = {
  type: new List(ChannelOptionCategoryType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ChannelOptionCategory, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default channelOptionCategories;
