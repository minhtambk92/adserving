/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Permission } from '../models';

const PermissionType = new ObjectType({
  name: 'Permission',
  fields: Object.assign(attributeFields(Permission, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default PermissionType;
