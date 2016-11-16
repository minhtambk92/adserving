/**
 * Created by Quy on 11/15/2016.
 */
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Site } from '../models';
import ChannelType from '../types/ChannelType';

const siteBelongsToChannel = () => ({
  type: ChannelType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Site.channel, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default siteBelongsToChannel;

