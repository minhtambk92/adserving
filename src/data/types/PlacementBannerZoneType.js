import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { PlacementBannerZone } from '../models';
import placementBannerZoneBelongsToBanner from '../queries/placementBannerZoneBelongsToBanner';
import placementBannerZoneBelongsToZone from '../queries/placementBannerZoneBelongsToZone';
import placementBannerZoneBelongsToPlacement from '../queries/placementBannerZoneBelongsToPlacement';
const PlacementBannerZoneType = new ObjectType({
  name: 'PlacementBannerZone',
  fields: () => Object.assign(attributeFields(PlacementBannerZone, {
    // Additional options
  }), {
    // Additional fields
    banners: placementBannerZoneBelongsToBanner(),
    placements: placementBannerZoneBelongsToPlacement(),
    zones: placementBannerZoneBelongsToZone(),
  }),
});

export default PlacementBannerZoneType;
