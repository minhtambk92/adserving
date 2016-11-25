/**
 * Created by Manhhailua on 11/25/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Placement } from '../models';
import PlacementType from '../types/PlacementType';

const zoneHasManyPlacements = () => ({
  type: new List(PlacementType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Placement.placementBannerZones, {
    async after(results) {
      const placementIds = results.map(result => result.placementId);
      return await Placement.findAll({ where: { id: { $in: placementIds } } });
    },
  }),
});

export default zoneHasManyPlacements;
