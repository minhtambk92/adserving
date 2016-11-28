/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Role } from '../../models';

const RoleInputTypeWithoutId = new InputObjectType({
  name: 'RoleInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Role, {
    only: [
      'uniqueName',
      'name',
    ],
  }), {
    // Additional fields
  }),
});

export default RoleInputTypeWithoutId;
