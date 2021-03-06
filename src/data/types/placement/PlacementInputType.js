import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../../models';

const PlacementInputType = new InputObjectType({
  name: 'PlacementInputType',
  fields: () => Object.assign(attributeFields(Placement, {
    // Additional options
    only: [
      'id',
      'startTime',
      'endTime',
      'description',
      'campaignId',
    ],
    allowNull: true,
  }), {
    // Additional fields
    name: { type: new NonNull(StringType) },
    width: { type: new NonNull(IntType) },
    weight: { type: new NonNull(IntType) },
    height: { type: new NonNull(IntType) },
    status: { type: new NonNull(StringType) },
    banners: { type: new List(StringType) },
  }),
});

export default PlacementInputType;
