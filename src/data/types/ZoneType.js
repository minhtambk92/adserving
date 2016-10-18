/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../models';
import zoneBelongsToSite from '../queries/zoneBelongsToSite';

const ZoneType = new ObjectType({
  name: 'Zone',
  fields: () => Object.assign(attributeFields(Zone, {
    // Additional options
  }), {
    site: zoneBelongsToSite(),
  }),
});

export default ZoneType;
