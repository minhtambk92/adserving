import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ShareZoneType from '../../types/shareZone/ShareZoneType';
import { ShareZone } from '../../models';

const shareZones = {
  type: new List(ShareZoneType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ShareZone, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default shareZones;
