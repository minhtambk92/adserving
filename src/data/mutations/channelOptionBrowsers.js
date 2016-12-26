
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ChannelOptionBrowserType from '../types/channelOptionBrowser/ChannelOptionBrowserType';
import ChannelOptionBrowserInputType from '../types/channelOptionBrowser/ChannelOptionBrowserInputType';
import ChannelOptionBrowserInputTypeWithoutId from '../types/channelOptionBrowser/ChannelOptionBrowserInputTypeWithoutId';
import { ChannelOptionBrowser } from '../models';

const channelOptionBrowsers = {
  createdChannelOptionBrowser: {
    type: ChannelOptionBrowserType,
    args: {
      channelOptionBrowser: { type: ChannelOptionBrowserInputTypeWithoutId },
    },
    resolve: resolver(ChannelOptionBrowser, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await ChannelOptionBrowser.create(args.channelOptionBrowser).then(channelOptionBrowser => {
          opts.where.id = { $eq: channelOptionBrowser.id };
        });
        return opts;
      },
    }),
  },
  updatedChannelOptionBrowser: {
    type: ChannelOptionBrowserType,
    args: {
      channelOptionBrowser: { type: ChannelOptionBrowserInputType },
    },
    resolve: resolver(ChannelOptionBrowser, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.channelOptionBrowser.id };
        const newChannelOptionBrowser = Object.assign({}, args.channelOptionBrowser);
        delete newChannelOptionBrowser.id; // Prevent update id

        await ChannelOptionBrowser.update(newChannelOptionBrowser, {
          where: {
            id: args.channelOptionBrowser.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedChannelOptionBrowser: {
    type: ChannelOptionBrowserType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(ChannelOptionBrowser, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        ChannelOptionBrowser.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default channelOptionBrowsers;
