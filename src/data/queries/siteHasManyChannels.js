import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Site } from '../models';
import ChannelType from '../types/ChannelType';

const siteHasManyChannels = () => ({
  type: new List(ChannelType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Site.channels, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default siteHasManyChannels;
