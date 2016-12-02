/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ShareZoneType from '../types/shareZone/ShareZoneType';
import ShareZoneInputType from '../types/shareZone/ShareZoneInputType';
import ShareZoneInputTypeWithoutId from '../types/shareZone/ShareZoneInputTypeWithoutId';
import { ShareZone } from '../models';

const shareZones = {
  createdShareZone: {
    type: ShareZoneType,
    args: {
      shareZone: { type: ShareZoneInputTypeWithoutId },
    },
    resolve: resolver(ShareZone, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await ShareZone.create(args.shareZone).then(shareZone => {
          opts.where.id = { $eq: shareZone.id };
        });
        return opts;
      },
    }),
  },
  updatedShareZone: {
    type: ShareZoneType,
    args: {
      shareZone: { type: ShareZoneInputType },
    },
    resolve: resolver(ShareZone, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.shareZone.id };

        const newShareZone = Object.assign({}, args.shareZone);
        delete newShareZone.id; // Prevent update id

        await ShareZone.update(newShareZone, {
          where: {
            id: args.shareZone.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedShareZone: {
    type: ShareZoneType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(ShareZone, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        ShareZone.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default shareZones;
