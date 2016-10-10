/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Placement } from '../models';

const PlacementType = new ObjectType({
  name: 'Placement',
  fields: Object.assign(attributeFields(Placement, {
    // Additional options
  }), {
    // additional fields
  }),
});

export default PlacementType;
