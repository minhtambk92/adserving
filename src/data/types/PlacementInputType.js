import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';

const PlacementInputType = new InputObjectType({
  name: 'PlacementInputType',
  fields: attributeFields(Placement, {
    only: [
      'id',
      'name',
      'size',
      'startTime',
      'endTime',
      'weight',
      'description',
      'campaignId',
    ],
  }, {
    // Additional fields
  }),
});

export default PlacementInputType;
