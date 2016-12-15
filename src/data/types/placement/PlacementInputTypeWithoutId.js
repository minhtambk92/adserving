import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../../models';

const PlacementInputTypeWithoutId = new InputObjectType({
  name: 'PlacementInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Placement, {
    only: [
      'name',
      'width',
      'height',
      'startTime',
      'endTime',
      'weight',
      'description',
      'campaignId',
      'status',
    ],
  }), {
    // Additional fields
  }),
});

export default PlacementInputTypeWithoutId;
