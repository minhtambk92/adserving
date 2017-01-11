/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ZoneType } from '../../models';
import zoneTypeHasManyZones from '../../queries/zoneType/zoneTypeHasManyZones';

const ZoneTypeType = new ObjectType({
  name: 'ZoneTypeType',
  fields: () => Object.assign(attributeFields(ZoneType, {
    // Additional options
  }), {
    // Additional fields
    zones: zoneTypeHasManyZones(),
  }),
});

export default ZoneTypeType;
