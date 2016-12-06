import { resolver, defaultListArgs } from 'graphql-sequelize';
import { PlacementBanner } from '../../models';
import PlacementType from '../../types/placement/PlacementType';

const placementBannerBelongsToPlacement = () => ({
  type: PlacementType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(PlacementBanner.placement, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementBannerBelongsToPlacement;
