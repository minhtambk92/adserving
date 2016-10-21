/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../models';

const ZoneInputType = new InputObjectType({
  name: 'ZoneInput',
  fields: attributeFields(Zone, {
    only: [
      'id',
      'siteId',
      'name',
      'description',
      'type',
      'html',
      'css',
      'slot',
      'status',
    ],
  }, {
    // Additional fields
  }),
});

export default ZoneInputType;
