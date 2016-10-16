import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';

const PlacementInputType = new InputObjectType({
  name: 'PlacementInputType',
  fields: attributeFields(Placement, {
    only: [
      'id',
      'userId',
      'name',
      'size',
      'startTime',
      'endTime',
      'weight',
      'description',
    ],
  }, {
    // Additional fields
  }),
});

export default PlacementInputType;
