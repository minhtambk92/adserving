import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Zone } from '../../models';
import ShareType from '../../types/share/ShareType';

const zoneHasManyShares = () => ({
  type: new List(ShareType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Zone.shares, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default zoneHasManyShares;
