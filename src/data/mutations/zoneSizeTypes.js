import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ZoneSizeTypeType from '../types/zoneSizeType/ZoneSizeTypeType';
import ZoneSizeTypeInputType from '../types/zoneSizeType/ZoneSizeTypeInputType';
import ZoneSizeTypeInputTypeWithoutId from '../types/zoneSizeType/ZoneSizeTypeInputTypeWithoutId';
import { ZoneSizeType } from '../models';

const zoneSizeTypes = {
  createdZoneSizeType: {
    type: ZoneSizeTypeType,
    args: {
      zoneSizeType: { type: ZoneSizeTypeInputTypeWithoutId },
    },
    resolve: resolver(ZoneSizeType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        /* eslint-disable no-shadow */
        await ZoneSizeType.create(args.zoneSizeType).then(zoneSizeType => {
          /* eslint-enable no-shadow */
          opts.where.id = { $eq: zoneSizeType.id };
        });
        return opts;
      },
    }),
  },
  updatedZoneSizeType: {
    type: ZoneSizeTypeType,
    args: {
      zoneSizeType: { type: ZoneSizeTypeInputType },
    },
    resolve: resolver(ZoneSizeType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.zoneSizeType.id };
        const newZoneSizeType = Object.assign({}, args.zoneSizeType);
        delete newZoneSizeType.id; // Prevent update id

        await ZoneSizeType.update(newZoneSizeType, {
          where: {
            id: args.zoneSizeType.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedZoneSizeType: {
    type: ZoneSizeTypeType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(ZoneSizeType, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        ZoneSizeType.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default zoneSizeTypes;
