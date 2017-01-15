import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Placement } from '../../models';
import ShareType from '../../types/share/ShareType';

const placementBelongsToManyShares = () => ({
  type: new List(ShareType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Placement.shares, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementBelongsToManyShares;
