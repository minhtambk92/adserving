
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import BannerHtmlTypeType from '../types/bannerHtmlType/BannerHtmlTypeType';
import BannerHtmlTypeInputType from '../types/bannerHtmlType/BannerHtmlTypeInputType';
import BannerHtmlTypeInputTypeWithoutId from '../types/bannerHtmlType/BannerHtmlTypeInputTypeWithoutId';
import { BannerHtmlType } from '../models';

const bannerHtmlTypes = {
  createdBannerHtmlType: {
    type: BannerHtmlTypeType,
    args: {
      bannerHtmlType: { type: BannerHtmlTypeInputTypeWithoutId },
    },
    resolve: resolver(BannerHtmlType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        /* eslint-disable no-shadow */
        await BannerHtmlType.create(args.bannerHtmlType).then((bannerHtmlType) => {
          /* eslint-enable no-shadow */
          opts.where.id = { $eq: bannerHtmlType.id };
        });
        return opts;
      },
    }),
  },
  updatedBannerHtmlType: {
    type: BannerHtmlTypeType,
    args: {
      bannerHtmlType: { type: BannerHtmlTypeInputType },
    },
    resolve: resolver(BannerHtmlType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.bannerHtmlType.id };
        const newBannerHtmlType = Object.assign({}, args.bannerHtmlType);
        delete newBannerHtmlType.id; // Prevent update id

        await BannerHtmlType.update(newBannerHtmlType, {
          where: {
            id: args.bannerHtmlType.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedBannerHtmlType: {
    type: BannerHtmlTypeType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(BannerHtmlType, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        BannerHtmlType.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default bannerHtmlTypes;
