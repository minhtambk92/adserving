import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../../models';
import placementBelongsToCampaign from '../../queries/placement/placementBelongsToCampaign';
import placementBelongsToManyBanners from '../../queries/placement/placementBelongsToManyBanners';
import placementBelongsToManyShares from '../../queries/placement/placementBelongsToManyShares';

const PlacementType = new ObjectType({
  name: 'PlacementType',
  fields: () => Object.assign(attributeFields(Placement, {
    // Additional options
  }), {
    // Additional fields
    campaign: placementBelongsToCampaign(),
    banners: placementBelongsToManyBanners(),
    shares: placementBelongsToManyShares(),
  }),
});

export default PlacementType;
