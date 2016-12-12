import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { PlacementBanner } from '../../models';

const PlacementBannerInputType = new InputObjectType({
  name: 'PlacementBannerInputType',
  fields: () => Object.assign(attributeFields(PlacementBanner, {
    // Additional options
    only: ['id', 'placementId', 'bannerId'],
  }), {
    // Additional fields
  }),
});

export default PlacementBannerInputType;
