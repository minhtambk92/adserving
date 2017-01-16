/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ShareType from '../types/share/ShareType';
import ShareInputType from '../types/share/ShareInputType';
import ShareInputTypeWithoutId from '../types/share/ShareInputTypeWithoutId';
import { Share, SharePlacement } from '../models';

const shares = {
  createdShare: {
    type: ShareType,
    args: {
      share: { type: ShareInputTypeWithoutId },
    },
    resolve: resolver(Share, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Share.create(args.share).then(share => {
          opts.where.id = { $eq: share.id };
        });
        return opts;
      },
    }),
  },
  updatedShare: {
    type: ShareType,
    args: {
      share: { type: ShareInputType },
    },
    resolve: resolver(Share, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.share.id };

        const newShare = Object.assign({}, args.share);
        delete newShare.id; // Prevent update id

        if (newShare.placements) {
          const sharePlacements = JSON.parse(newShare.placements);

          sharePlacements.forEach(async (placement) => {
            const sharePlacement = await SharePlacement.findOne({
              where: {
                shareId: args.share.id,
                placementId: placement.id,
              },
              paranoid: false,
            });

            if (!sharePlacement && placement.isDeleted === true) {
              await SharePlacement.create({
                shareId: args.share.id,
                placementId: placement.id,
                status: 'active',
              });
            } else if (
              sharePlacement && sharePlacement.getDataValue('deletedAt') !== null && placement.isDeleted === true
            ) {
              await sharePlacement.restore();
            } else if (sharePlacement && placement.isDeleted === false) {
              await sharePlacement.destroy();
            }
          });
        }

        await Share.update(newShare, {
          where: {
            id: args.share.id,
          },
        });
        return opts;
      },
    }),
  },
  deletedShare: {
    type: ShareType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Share, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Share.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default shares;
