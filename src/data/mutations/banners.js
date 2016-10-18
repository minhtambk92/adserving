
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import BannerType from '../types/BannerType';
import BannerInputType from '../types/BannerInputType';
import BannerInputTypeWithoutId from '../types/BannerInputTypeWithoutId';
import { Banner } from '../models';

const banners = {
  createdBanner: {
    type: BannerType,
    args: {
      banner: { type: BannerInputTypeWithoutId },
    },
    resolve: resolver(Banner, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Banner.create(args.banner).then(banner => {
          opts.where.id = { $eq: banner.id };
        });
        return opts;
      },
    }),
  },
  updatedBanner: {
    type: BannerType,
    args: {
      banner: { type: BannerInputType },
    },
    resolve: resolver(Banner, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.banner.id };
        await Banner.upsert(args.banner);
        return opts;
      },
    }),
  },
  deletedBanner: {
    type: BannerType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Banner, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Banner.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default banners;