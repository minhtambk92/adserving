/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';
import placementHasManyPlacementBannerZones from '../queries/placementHasManyPlacementBannerZones';
import placementBelongsToCampaign from '../queries/placementBelongsToCampaign';

const PlacementType = new ObjectType({
  name: 'Placement',
  fields: () => Object.assign(attributeFields(Placement, {
    // Additional options
  }), {
    // Additional fields
    pbzPlacement: placementHasManyPlacementBannerZones(),
    campaign: placementBelongsToCampaign(),
  }),
});

export default PlacementType;
