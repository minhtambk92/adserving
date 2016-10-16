import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';

const PlacementInputTypeWithoutId = new InputObjectType({
  name: 'PlacementInputTypeWithoutId',
  fields: attributeFields(Placement, {
    only: [
      'userId',
      'name',
      'size',
      'startTime',
      'endTime',
      'weight',
      'description',
    ],
  }),
});

export default PlacementInputTypeWithoutId;
