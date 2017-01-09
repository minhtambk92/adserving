import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Permission } from '../../models';

const PermissionInputTypeWithoutId = new InputObjectType({
  name: 'PermissionInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Permission, {
    only: ['name', 'status'],
  }), {
    // Additional fields
  }),
});

export default PermissionInputTypeWithoutId;
