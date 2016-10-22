import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { PlacementBannerZone } from '../models';

const PlacementBannerZoneInputType = new InputObjectType({
  name: 'PlacementBannerZoneInputType',
  fields: () => Object.assign(attributeFields(PlacementBannerZone, {
    // Additional options
    only: ['id', 'placementId', 'bannerId', 'zoneId'],
  }), {
    // Additional fields
  }),
});

export default PlacementBannerZoneInputType;
