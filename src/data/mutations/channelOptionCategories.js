import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ChannelOptionCategoryType from '../types/channelOptionCategory/ChannelOptionCategoryType';
import ChannelOptionCategoryInputType from '../types/channelOptionCategory/ChannelOptionCategoryInputType';
import ChannelOptionCategoryInputTypeWithoutId from '../types/channelOptionCategory/ChannelOptionCategoryInputTypeWithoutId';
import { ChannelOptionCategory } from '../models';

const channelOptionCategories = {
  createdChannelOptionCategory: {
    type: ChannelOptionCategoryType,
    args: {
      channelOptionCategory: { type: ChannelOptionCategoryInputTypeWithoutId },
    },
    resolve: resolver(ChannelOptionCategory, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await ChannelOptionCategory.create(args.channelOptionCategory).then(
          channelOptionCategory => {
            opts.where.id = { $eq: channelOptionCategory.id };
          });
        return opts;
      },
    }),
  },
  updatedChannelOptionCategory: {
    type: ChannelOptionCategoryType,
    args: {
      channelOptionCategory: { type: ChannelOptionCategoryInputType },
    },
    resolve: resolver(ChannelOptionCategory, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.channelOptionCategory.id };
        const newChannelOptionCategory = Object.assign({}, args.channelOptionCategory);
        delete newChannelOptionCategory.id; // Prevent update id

        await ChannelOptionCategory.update(newChannelOptionCategory, {
          where: {
            id: args.channelOptionCategory.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedChannelOptionCategory: {
    type: ChannelOptionCategoryType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(ChannelOptionCategory, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        ChannelOptionCategory.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default channelOptionCategories;
