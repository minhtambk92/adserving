import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { PlacementBanner } from '../../models';
import placementBannerBelongsToBanner from '../../queries/placementBanner/placementBannerBelongsToBanner';
import placementBannerBelongsToPlacement from '../../queries/placementBanner/placementBannerBelongsToPlacement';

const PlacementBannerType = new ObjectType({
  name: 'PlacementBannerType',
  fields: () => Object.assign(attributeFields(PlacementBanner, {
    // Additional options
  }), {
    // Additional fields
    banners: placementBannerBelongsToBanner(),
    placements: placementBannerBelongsToPlacement(),
  }),
});

export default PlacementBannerType;
