import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import SharePlacementType from '../types/sharePlacement/SharePlacementType';
import SharePlacementInputType from '../types/sharePlacement/SharePlacementInputType';
import SharePlacementInputTypeWithoutId from '../types/sharePlacement/SharePlacementInputTypeWithoutId';
import { SharePlacement } from '../models';

const sharePlacements = {
  createdSharePlacement: {
    type: SharePlacementType,
    args: {
      sharePlacement: { type: SharePlacementInputTypeWithoutId },
    },
    resolve: resolver(SharePlacement, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await SharePlacement.create(args.sharePlacement).then(sharePlacement => {
          opts.where.id = { $eq: sharePlacement.id };
        });
        return opts;
      },
    }),
  },
  updatedSharePlacement: {
    type: SharePlacementType,
    args: {
      sharePlacement: { type: SharePlacementInputType },
    },
    resolve: resolver(SharePlacement, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.sharePlacement.id };

        const newSharePlacement = Object.assign({}, args.sharePlacement);
        delete newSharePlacement.id; // Prevent update id

        await SharePlacement.update(newSharePlacement, {
          where: {
            id: args.sharePlacement.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedSharePlacement: {
    type: SharePlacementType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(SharePlacement, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        SharePlacement.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default sharePlacements;
