import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';

const PlacementInputTypeWithoutId = new InputObjectType({
  name: 'PlacementInputTypeWithoutId',
  fields: attributeFields(Placement, {
    only: [
      'name',
      'size',
      'startTime',
      'endTime',
      'weight',
      'description',
      'campaignId',
    ],
  }),
});

export default PlacementInputTypeWithoutId;
