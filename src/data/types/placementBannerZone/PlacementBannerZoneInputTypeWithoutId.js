import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { PlacementBannerZone } from '../models';

const PlacementBannerZoneInputTypeWithoutId = new InputObjectType({
  name: 'PlacementBannerZoneInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(PlacementBannerZone, {
    only: [
      'placementId',
      'bannerId',
      'zoneId',
    ],
  }), {
    // Additional fields
  }),
});

export default PlacementBannerZoneInputTypeWithoutId;
