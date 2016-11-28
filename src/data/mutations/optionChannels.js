
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import OptionChannelType from '../types/optionChannel/OptionChannelType';
import OptionChannelInputType from '../types/optionChannel/OptionChannelInputType';
import OptionChannelInputTypeWithoutId from '../types/optionChannel/OptionChannelInputTypeWithoutId';
import { OptionChannel } from '../models';

const optionChannels = {
  createdOptionChannel: {
    type: OptionChannelType,
    args: {
      optionChannel: { type: OptionChannelInputTypeWithoutId },
    },
    resolve: resolver(OptionChannel, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await OptionChannel.create(args.optionChannel).then(optionChannel => {
          opts.where.id = { $eq: optionChannel.id };
        });
        return opts;
      },
    }),
  },
  updatedOptionChannel: {
    type: OptionChannelType,
    args: {
      optionChannel: { type: OptionChannelInputType },
    },
    resolve: resolver(OptionChannel, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.optionChannel.id };
        const newOptionChannel = Object.assign({}, args.optionChannel);
        delete newOptionChannel.id; // Prevent update id

        await OptionChannel.update(newOptionChannel, {
          where: {
            id: args.optionChannel.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedOptionChannel: {
    type: OptionChannelType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(OptionChannel, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        OptionChannel.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default optionChannels;
