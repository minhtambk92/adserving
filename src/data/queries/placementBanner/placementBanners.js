import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import PlacementBannerType from '../../types/placementBanner/PlacementBannerType';
import { PlacementBanner } from '../../models';

const placementBanners = {
  type: new List(PlacementBannerType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(PlacementBanner, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default placementBanners;

