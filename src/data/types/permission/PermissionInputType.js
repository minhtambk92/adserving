import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Permission } from '../../models';

const PermissionInputType = new InputObjectType({
  name: 'PermissionInputType',
  fields: () => Object.assign(attributeFields(Permission, {
    // Additional Permissions
    only: ['id'],
  }), {
    // Additional fields
    name: { type: new NonNull(StringType) },
    status: { type: new NonNull(StringType) },
  }),
});

export default PermissionInputType;
