/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../models';

const ZoneType = new ObjectType({
  name: 'Zone',
  fields: Object.assign(attributeFields(Site, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default ZoneType;
