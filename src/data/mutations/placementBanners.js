
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import PlacementBannerType from '../types/placementBanner/PlacementBannerType';
import PlacementBannerInputType from '../types/placementBanner/PlacementBannerInputType';
import PlacementBannerInputTypeWithoutId from '../types/placementBanner/PlacementBannerInputTypeWithoutId';
import { PlacementBanner } from '../models';

const placementBanners = {
  createdPlacementBanner: {
    type: PlacementBannerType,
    args: {
      placementBanner: { type: PlacementBannerInputTypeWithoutId },
    },
    resolve: resolver(PlacementBanner, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await PlacementBanner.create(args.placementBanner).then(placementBanner => {
          opts.where.id = { $eq: placementBanner.id };
        });
        return opts;
      },
    }),
  },
  updatedPlacementBanner: {
    type: PlacementBannerType,
    args: {
      placementBanner: { type: PlacementBannerInputType },
    },
    resolve: resolver(PlacementBanner, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.placementBanner.id };
        const newPlacementBanner = Object.assign({}, args.placementBanner);
        delete newPlacementBanner.id; // Prevent update id

        await PlacementBanner.update(newPlacementBanner, {
          where: {
            id: args.placementBanner.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedPlacementBanner: {
    type: PlacementBannerType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(PlacementBanner, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        PlacementBanner.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default placementBanners;
