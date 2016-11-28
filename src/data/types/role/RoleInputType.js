/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Role } from '../../models';

const RoleInputType = new InputObjectType({
  name: 'RoleInputType',
  fields: () => Object.assign(attributeFields(Role, {
    // Additional options
    only: [
      'uniqueName',
      'name',
    ],
    allowNull: true,
  }), {
    // Additional fields
    id: { type: new NonNull(ID) },
  }),
});

export default RoleInputType;
