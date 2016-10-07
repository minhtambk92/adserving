import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';

const UserInputTypeWithoutId = new InputObjectType({
  name: 'UserInputWithoutId',
  fields: attributeFields(User, {
    only: ['username', 'email', 'password'],
  }),
});

export default UserInputTypeWithoutId;
