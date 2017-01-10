
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import BannerTypeType from '../types/bannerType/BannerTypeType';
import BannerTypeInputType from '../types/bannerType/BannerTypeInputType';
import BannerTypeInputTypeWithoutId from '../types/bannerType/BannerTypeInputTypeWithoutId';
import { BannerType } from '../models';

const bannerTypes = {
  createdBannerType: {
    type: BannerTypeType,
    args: {
      bannerType: { type: BannerTypeInputTypeWithoutId },
    },
    resolve: resolver(BannerType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        /* eslint-disable no-shadow */
        await BannerType.create(args.bannerType).then(bannerType => {
          /* eslint-enable no-shadow */
          opts.where.id = { $eq: bannerType.id };
        });
        return opts;
      },
    }),
  },
  updatedBannerType: {
    type: BannerTypeType,
    args: {
      bannerType: { type: BannerTypeInputType },
    },
    resolve: resolver(BannerType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.bannerType.id };
        const newBannerType = Object.assign({}, args.bannerType);
        delete newBannerType.id; // Prevent update id

        await BannerType.update(newBannerType, {
          where: {
            id: args.bannerType.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedBannerType: {
    type: BannerTypeType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(BannerType, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        BannerType.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default bannerTypes;
