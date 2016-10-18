import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';

const UserInputTypeWithoutId = new InputObjectType({
  name: 'UserInputTypeWithoutId',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['email', 'password', 'emailConfirmed', 'status'],
  }), {
    // Additional fields
  }),
});

export default UserInputTypeWithoutId;
