
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import AdvertiserType from '../types/AdvertiserType';
import AdvertiserInputType from '../types/AdvertiserInputType';
import AdvertiserInputTypeWithoutId from '../types/AdvertiserInputTypeWithoutId';
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
        await Advertiser.upsert(args.advertiser);
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
