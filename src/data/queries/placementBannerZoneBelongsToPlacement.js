import { resolver, defaultListArgs } from 'graphql-sequelize';
import { PlacementBannerZone } from '../models';
import PlacementType from '../types/PlacementType';

const placementBannerZoneBelongsToPlacement = () => ({
  type: PlacementType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(PlacementBannerZone.placement, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementBannerZoneBelongsToPlacement;
