import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLID as ID,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';

const UserInputType = new InputObjectType({
  name: 'UserInputType',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['email', 'password', 'emailConfirmed', 'status'],
    allowNull: true,
  }), {
    // Additional fields
    id: { type: new NonNull(ID) },
    roleIds: { type: new List(ID) },
  }),
});

export default UserInputType;
