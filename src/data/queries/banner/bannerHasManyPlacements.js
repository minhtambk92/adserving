import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Placement } from '../../models';
import PlacementType from '../../types/placement/PlacementType';

const bannerHasManyPlacements = () => ({
  type: new List(PlacementType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Placement.placementBanners, {
    async after(results) {
      const placementIds = results.map(result => result.placementId);
      return await Placement.findAll({
        where: {
          id: { $in: placementIds },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    },
  }),
});

export default bannerHasManyPlacements;