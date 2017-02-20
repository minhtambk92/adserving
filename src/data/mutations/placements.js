
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import PlacementType from '../types/placement/PlacementType';
import PlacementInputType from '../types/placement/PlacementInputType';
import PlacementInputTypeWithoutId from '../types/placement/PlacementInputTypeWithoutId';
import { Placement, PlacementBanner } from '../models';

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
        await Placement.create(args.placement).then((placement) => {
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

        if (newPlacement.banners) {
          const placementBanners = JSON.parse(newPlacement.banners);

          placementBanners.forEach(async (banner) => {
            const placementBanner = await PlacementBanner.findOne({
              where: {
                placementId: args.placement.id,
                bannerId: banner.id,
              },
              paranoid: false,
            });

            if (!placementBanner && banner.isDeleted === false) {
              await PlacementBanner.create({
                placementId: args.placement.id,
                bannerId: banner.id,
                status: 'active',
              });
            } else if (placementBanner && placementBanner.getDataValue('deletedAt') !== null && banner.isDeleted === false) {
              await placementBanner.restore();
            } else if (placementBanner && banner.isDeleted === true) {
              await placementBanner.destroy();
            }
          });
        }

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
