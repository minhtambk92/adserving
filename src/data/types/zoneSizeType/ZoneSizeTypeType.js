/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ZoneSizeType } from '../../models';

const ZoneSizeTypeType = new ObjectType({
  name: 'ZoneSizeTypeType',
  fields: () => Object.assign(attributeFields(ZoneSizeType, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default ZoneSizeTypeType;
