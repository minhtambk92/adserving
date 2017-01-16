/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ZoneSizeType } from '../../models';
import zoneSizeTypeHasManyZones from '../../queries/zoneSizeType/zoneSizeTypeHasManyZones';

const ZoneSizeTypeType = new ObjectType({
  name: 'ZoneSizeTypeType',
  fields: () => Object.assign(attributeFields(ZoneSizeType, {
    // Additional options
  }), {
    // Additional fields
    zones: zoneSizeTypeHasManyZones(),
  }),
});

export default ZoneSizeTypeType;
