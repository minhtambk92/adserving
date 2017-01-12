import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ZoneTypeType from '../types/zoneType/ZoneTypeType';
import ZoneTypeInputType from '../types/zoneType/ZoneTypeInputType';
import ZoneTypeInputTypeWithoutId from '../types/zoneType/ZoneTypeInputTypeWithoutId';
import { ZoneType } from '../models';

const zoneTypes = {
  createdZoneType: {
    type: ZoneTypeType,
    args: {
      zoneType: { type: ZoneTypeInputTypeWithoutId },
    },
    resolve: resolver(ZoneType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        /* eslint-disable no-shadow */
        await ZoneType.create(args.zoneType).then(zoneType => {
          /* eslint-enable no-shadow */
          opts.where.id = { $eq: zoneType.id };
        });
        return opts;
      },
    }),
  },
  updatedZoneType: {
    type: ZoneTypeType,
    args: {
      zoneType: { type: ZoneTypeInputType },
    },
    resolve: resolver(ZoneType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.zoneType.id };
        const newZoneType = Object.assign({}, args.zoneType);
        delete newZoneType.id; // Prevent update id

        await ZoneType.update(newZoneType, {
          where: {
            id: args.zoneType.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedZoneType: {
    type: ZoneTypeType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(ZoneType, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        ZoneType.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default zoneTypes;
