import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../../models';
import placementBelongsToCampaign from '../../queries/placement/placementBelongsToCampaign';
import placementHasManyBanners from '../../queries/placement/placementHasManyBanners';
import placementHasManyShares from '../../queries/placement/placementHasManyShares';

const PlacementType = new ObjectType({
  name: 'PlacementType',
  fields: () => Object.assign(attributeFields(Placement, {
    // Additional options
  }), {
    // Additional fields
    campaign: placementBelongsToCampaign(),
    banners: placementHasManyBanners(),
    shares: placementHasManyShares(),
  }),
});

export default PlacementType;
