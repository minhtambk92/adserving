import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';
import UserProfileInputType from '../userProfile/UserProfileInputType';

const UserInputTypeWithoutId = new InputObjectType({
  name: 'UserInputTypeWithoutId',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['email', 'password', 'emailConfirmed', 'status'],
  }), {
    // Additional fields
    roles: { type: new NonNull(new List(StringType)) },
    profile: { type: new NonNull(UserProfileInputType) },
  }),
});

export default UserInputTypeWithoutId;
