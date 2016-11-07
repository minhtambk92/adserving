import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLID as ID,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';
import UserProfileInputType from './UserProfileInputType';

const UserInputType = new InputObjectType({
  name: 'UserInputType',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['email', 'password', 'emailConfirmed', 'status'],
    allowNull: true,
  }), {
    // Additional fields
    id: { type: new NonNull(ID) },
    roles: { type: new List(StringType) },
    profile: { type: UserProfileInputType },
  }),
});

export default UserInputType;
