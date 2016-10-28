import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';

const PlacementInputType = new InputObjectType({
  name: 'PlacementInputType',
  fields: () => Object.assign(attributeFields(Placement, {
    // Additional options
    only: [
      'id',
      'startTime',
      'endTime',
      'weight',
      'description',
      'campaignId',
    ],
  }), {
    // Additional fields
    name: { type: StringType },
    sizeWidth: { type: IntType },
    sizeHeight: { type: IntType },
    status: { type: StringType },
  }),
});

export default PlacementInputType;
