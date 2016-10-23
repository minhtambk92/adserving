/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../models';

const ZoneInputTypeWithoutId = new InputObjectType({
  name: 'ZoneInputWithoutId',
  fields: () => Object.assign(attributeFields(Zone, {
    only: [
      'siteId',
      'name',
      'type',
      'html',
      'css',
      'slot',
      'status',
      'description',
    ],
  }), {
    // Additional fields
  }),
});

export default ZoneInputTypeWithoutId;
