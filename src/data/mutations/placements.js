
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import PlacementType from '../types/PlacementType';
import PlacementInputType from '../types/PlacementInputType';
import PlacementInputTypeWithoutId from '../types/PlacementInputTypeWithoutId';
import { Placement } from '../models';

const placements = {
  createdPlacement: {
    type: PlacementType,
    args: {
      placement: { type: PlacementInputTypeWithoutId },
    },
    resolve: resolver(Placement, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Placement.create(args.placement).then(placement => {
          opts.where.id = { $eq: placement.id };
        });
        return opts;
      },
    }),
  },
  updatedPlacement: {
    type: PlacementType,
    args: {
      placement: { type: PlacementInputType },
    },
    resolve: resolver(Placement, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.placement.id };
        const newPlacement = Object.assign({}, args.placement);
        delete newPlacement.id; // Prevent update id

        await Placement.update(newPlacement, {
          where: {
            id: args.placement.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedPlacement: {
    type: PlacementType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Placement, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Placement.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default placements;
