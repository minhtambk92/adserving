/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ZoneType from '../types/zone/ZoneType';
import ZoneInputType from '../types/zone/ZoneInputType';
import ZoneInputTypeWithoutId from '../types/zone/ZoneInputTypeWithoutId';
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

        const newZone = Object.assign({}, args.zone);
        delete newZone.id; // Prevent update id

        await Zone.update(newZone, {
          where: {
            id: args.zone.id,
          },
        });

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
