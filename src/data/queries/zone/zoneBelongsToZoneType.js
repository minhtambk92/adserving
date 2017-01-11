/**
 * Created by Manhhailua on 10/17/16.
 */

import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Zone } from '../../models';
import ZoneTypeType from '../../types/zoneType/ZoneTypeType';

const zoneBelongsToZoneType = () => ({
  type: ZoneTypeType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Zone.zoneType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default zoneBelongsToZoneType;
