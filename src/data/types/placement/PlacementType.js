import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../../models';
import placementBelongsToCampaign from '../../queries/placement/placementBelongsToCampaign';
import placementBelongsToManyBanners from '../../queries/placement/placementBelongsToManyBanners';
import placementHasManyShares from '../../queries/placement/placementHasManyShares';

const PlacementType = new ObjectType({
  name: 'PlacementType',
  fields: () => Object.assign(attributeFields(Placement, {
    // Additional options
  }), {
    // Additional fields
    campaign: placementBelongsToCampaign(),
    banners: placementBelongsToManyBanners(),
    shares: placementHasManyShares(),
  }),
});

export default PlacementType;
