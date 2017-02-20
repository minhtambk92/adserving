
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ChannelType from '../types/channel/ChannelType';
import ChannelInputType from '../types/channel/ChannelInputType';
import ChannelInputTypeWithoutId from '../types/channel/ChannelInputTypeWithoutId';
import { Channel } from '../models';

const channels = {
  createdChannel: {
    type: ChannelType,
    args: {
      channel: { type: ChannelInputTypeWithoutId },
    },
    resolve: resolver(Channel, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Channel.create(args.channel).then((channel) => {
          opts.where.id = { $eq: channel.id };
        });
        return opts;
      },
    }),
  },
  updatedChannel: {
    type: ChannelType,
    args: {
      channel: { type: ChannelInputType },
    },
    resolve: resolver(Channel, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.channel.id };
        const newChannel = Object.assign({}, args.channel);
        delete newChannel.id; // Prevent update id

        await Channel.update(newChannel, {
          where: {
            id: args.channel.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedChannel: {
    type: ChannelType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Channel, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Channel.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default channels;
