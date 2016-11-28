
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import AdvertiserType from '../types/advertiser/AdvertiserType';
import AdvertiserInputType from '../types/advertiser/AdvertiserInputType';
import AdvertiserInputTypeWithoutId from '../types/advertiser/AdvertiserInputTypeWithoutId';
import { Advertiser } from '../models';

const advertisers = {
  createdAdvertiser: {
    type: AdvertiserType,
    args: {
      advertiser: { type: AdvertiserInputTypeWithoutId },
    },
    resolve: resolver(Advertiser, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Advertiser.create(args.advertiser).then(advertiser => {
          opts.where.id = { $eq: advertiser.id };
        });
        return opts;
      },
    }),
  },
  updatedAdvertiser: {
    type: AdvertiserType,
    args: {
      advertiser: { type: AdvertiserInputType },
    },
    resolve: resolver(Advertiser, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.advertiser.id };
        const newAdvertiser = Object.assign({}, args.advertiser);
        delete newAdvertiser.id; // Prevent update id

        await Advertiser.update(newAdvertiser, {
          where: {
            id: args.advertiser.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedAdvertiser: {
    type: AdvertiserType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Advertiser, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Advertiser.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default advertisers;
