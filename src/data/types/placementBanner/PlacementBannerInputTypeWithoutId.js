import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { PlacementBanner } from '../../models';

const PlacementBannerInputTypeWithoutId = new InputObjectType({
  name: 'PlacementBannerInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(PlacementBanner, {
    only: [
      'placementId',
      'bannerId',
    ],
  }), {
    // Additional fields
  }),
});

export default PlacementBannerInputTypeWithoutId;
