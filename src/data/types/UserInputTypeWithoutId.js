import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLID as ID,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';

const UserInputTypeWithoutId = new InputObjectType({
  name: 'UserInputTypeWithoutId',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['email', 'password', 'emailConfirmed', 'status'],
  }), {
    // Additional fields
    roleIds: { type: new NonNull(new List(ID)) },
  }),
});

export default UserInputTypeWithoutId;
