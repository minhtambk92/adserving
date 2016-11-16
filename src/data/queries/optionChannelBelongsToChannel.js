/**
 * Created by Quy on 11/15/2016.
 */
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { OptionChannel } from '../models';
import ChannelType from '../types/ChannelType';

const optionChannelBelongsToChannel = () => ({
  type: ChannelType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannel.channel, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default optionChannelBelongsToChannel;

