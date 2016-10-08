/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../models';

const ZoneType = new ObjectType({
  name: 'Zone',
  fields: Object.assign(attributeFields(Zone, {
    // additional options
  }), {
    // additional fields
  }),
});

export default ZoneType;
