/**
 * Created by Manhhailua on 11/25/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Zone } from '../../models';
import ZoneType from '../../types/zone/ZoneType';

const placementHasManyZones = () => ({
  type: new List(ZoneType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Zone.placementBannerZones, {
    async after(results) {
      const zoneIds = results.map(result => result.zoneId);
      return await Zone.findAll({
        where: {
          id: { $in: zoneIds },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    },
  }),
});

export default placementHasManyZones;
