import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';

const UserInputType = new InputObjectType({
  name: 'UserInputType',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['id', 'email', 'password', 'emailConfirmed', 'status'],
  }), {
    // Additional fields
  }),
});

export default UserInputType;
