/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';
import placementBelongsToCampaign from '../queries/placementBelongsToCampaign';
import placementHasManyBanners from '../queries/placementHasManyBanners';
import placementHasManyZones from '../queries/placementHasManyZones';

const PlacementType = new ObjectType({
  name: 'PlacementType',
  fields: () => Object.assign(attributeFields(Placement, {
    // Additional options
  }), {
    // Additional fields
    campaign: placementBelongsToCampaign(),
    banners: placementHasManyBanners(),
    zones: placementHasManyZones(),
  }),
});

export default PlacementType;
