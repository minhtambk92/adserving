
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import AdsServerType from '../types/adsServer/AdsServerType';
import AdsServerInputType from '../types/adsServer/AdsServerInputType';
import AdsServerInputTypeWithoutId from '../types/adsServer/AdsServerInputTypeWithoutId';
import { AdsServer } from '../models';

const adsServers = {
  createdAdsServer: {
    type: AdsServerType,
    args: {
      adsServer: { type: AdsServerInputTypeWithoutId },
    },
    resolve: resolver(AdsServer, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await AdsServer.create(args.adsServer).then(adsServer => {
          opts.where.id = { $eq: adsServer.id };
        });
        return opts;
      },
    }),
  },
  updatedAdsServer: {
    type: AdsServerType,
    args: {
      adsServer: { type: AdsServerInputType },
    },
    resolve: resolver(AdsServer, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.adsServer.id };
        const newAdsServer = Object.assign({}, args.adsServer);
        delete newAdsServer.id; // Prevent update id

        await AdsServer.update(newAdsServer, {
          where: {
            id: args.adsServer.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedAdsServer: {
    type: AdsServerType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(AdsServer, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        AdsServer.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default adsServers;
