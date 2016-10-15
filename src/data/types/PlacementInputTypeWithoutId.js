import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';

const PlacementInputTypeWithoutId = new InputObjectType({
  name: 'PlacementInputTypeWithoutId',
  fields: attributeFields(Placement, {
    only: [
      'advertiserId',
      'userId',
      'name',
      'startTime',
      'endTime',
      'views',
      'viewPerSession',
      'timeResetViewCount',
      'weight',
      'description',
    ],
  }),
});

export default PlacementInputTypeWithoutId;
