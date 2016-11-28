
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import PlacementBannerZoneType from '../types/placementBannerZone/PlacementBannerZoneType';
import PlacementBannerZoneInputType from '../types/placementBannerZone/PlacementBannerZoneInputType';
import PlacementBannerZoneInputTypeWithoutId from '../types/placementBannerZone/PlacementBannerZoneInputTypeWithoutId';
import { PlacementBannerZone } from '../models';

const placementBannerZones = {
  createdPlacementBannerZone: {
    type: PlacementBannerZoneType,
    args: {
      placementBannerZone: { type: PlacementBannerZoneInputTypeWithoutId },
    },
    resolve: resolver(PlacementBannerZone, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await PlacementBannerZone.create(args.placementBannerZone).then(placementBannerZone => {
          opts.where.id = { $eq: placementBannerZone.id };
        });
        return opts;
      },
    }),
  },
  updatedPlacementBannerZone: {
    type: PlacementBannerZoneType,
    args: {
      placementBannerZone: { type: PlacementBannerZoneInputType },
    },
    resolve: resolver(PlacementBannerZone, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.placementBannerZone.id };
        const newPlacementBannerZone = Object.assign({}, args.placementBannerZone);
        delete newPlacementBannerZone.id; // Prevent update id

        await PlacementBannerZone.update(newPlacementBannerZone, {
          where: {
            id: args.placementBannerZone.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedPlacementBannerZone: {
    type: PlacementBannerZoneType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(PlacementBannerZone, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        PlacementBannerZone.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default placementBannerZones;
