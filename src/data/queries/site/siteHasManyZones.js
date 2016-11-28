/**
 * Created by Manhhailua on 10/17/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Site } from '../models';
import ZoneType from '../../types/zone/ZoneType';

const siteHasManyZones = () => ({
  type: new List(ZoneType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Site.zones, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default siteHasManyZones;
