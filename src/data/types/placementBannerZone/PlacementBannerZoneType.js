import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { PlacementBannerZone } from '../models';
import placementBannerZoneBelongsToBanner from '../../queries/placementBannerZone/placementBannerZoneBelongsToBanner';
import placementBannerZoneBelongsToZone from '../../queries/placementBannerZone/placementBannerZoneBelongsToZone';
import placementBannerZoneBelongsToPlacement from '../../queries/placementBannerZone/placementBannerZoneBelongsToPlacement';

const PlacementBannerZoneType = new ObjectType({
  name: 'PlacementBannerZoneType',
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
