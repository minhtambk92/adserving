/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ZoneType from '../types/ZoneType';
import ZoneInputType from '../types/ZoneInputType';
import ZoneInputTypeWithoutId from '../types/ZoneInputTypeWithoutId';
import { Zone } from '../models';

const zones = {
  createdZone: {
    type: ZoneType,
    args: {
      zone: { type: ZoneInputTypeWithoutId },
    },
    resolve: resolver(Zone, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Zone.create(args.zone).then(zone => {
          opts.where.id = { $eq: zone.id };
        });
        return opts;
      },
    }),
  },
  updatedZone: {
    type: ZoneType,
    args: {
      zone: { type: ZoneInputType },
    },
    resolve: resolver(Zone, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.zone.id };
        await Zone.upsert(args.zone);
        return opts;
      },
    }),
  },
  deletedZone: {
    type: ZoneType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Zone, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Zone.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default zones;
