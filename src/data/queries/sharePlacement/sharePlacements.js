import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import SharePlacementType from '../../types/sharePlacement/SharePlacementType';
import { SharePlacement } from '../../models';

const sharePlacements = {
  type: new List(SharePlacementType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(SharePlacement, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default sharePlacements;
