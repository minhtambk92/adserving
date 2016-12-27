/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ChannelOptionBrowserType from '../../types/channelOptionBrowser/ChannelOptionBrowserType';
import { ChannelOptionBrowser } from '../../models';

const channelOptionBrowsers = {
  type: new List(ChannelOptionBrowserType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ChannelOptionBrowser, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default channelOptionBrowsers;
