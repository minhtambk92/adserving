/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Role } from '../models';

const RoleType = new ObjectType({
  name: 'Role',
  fields: Object.assign(attributeFields(Role, {
    // additional options
  }), {
    // additional fields
  }),
});

export default RoleType;
