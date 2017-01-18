
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import BannerType from '../types/banner/BannerType';
import BannerInputType from '../types/banner/BannerInputType';
import BannerInputTypeWithoutId from '../types/banner/BannerInputTypeWithoutId';
import { Banner, PlacementBanner } from '../models';

const banners = {
  createdBanner: {
    type: BannerType,
    args: {
      banner: { type: BannerInputTypeWithoutId },
    },
    resolve: resolver(Banner, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Banner.create(args.banner).then(banner => {
          opts.where.id = { $eq: banner.id };
        });
        return opts;
      },
    }),
  },
  updatedBanner: {
    type: BannerType,
    args: {
      banner: { type: BannerInputType },
    },
    resolve: resolver(Banner, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.banner.id };

        const newBanner = Object.assign({}, args.banner);
        delete newBanner.id; // Prevent update idz

        if (newBanner.placements) {
          const bannerPlacements = JSON.parse(newBanner.placements);

          bannerPlacements.forEach(async (placement) => {
            const bannerPlacement = await PlacementBanner.findOne({
              where: {
                bannerId: args.banner.id,
                placementId: placement.id,
              },
              paranoid: false,
            });

            if (!bannerPlacement && placement.isDeleted === false) {
              await PlacementBanner.create({
                bannerId: args.banner.id,
                placementId: placement.id,
                status: 'active',
              });
            } else if (
              bannerPlacement && bannerPlacement.getDataValue('deletedAt') !== null && placement.isDeleted === false
            ) {
              await bannerPlacement.restore();
            } else if (bannerPlacement && placement.isDeleted === true) {
              await bannerPlacement.destroy();
            }
          });
        }

        await Banner.update(newBanner, {
          where: {
            id: args.banner.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedBanner: {
    type: BannerType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Banner, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Banner.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default banners;
