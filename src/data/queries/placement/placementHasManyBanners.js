/**
 * Created by Manhhailua on 11/25/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Banner } from '../../models';
import BannerType from '../../types/banner/BannerType';

const placementHasManyBanners = () => ({
  type: new List(BannerType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Banner.placementBanners, {
    async after(results) {
      const bannerIds = results.map(result => result.bannerId);
      return await Banner.findAll({
        where: {
          id: { $in: bannerIds },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    },
  }),
});

export default placementHasManyBanners;
