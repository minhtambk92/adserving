import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';

const UserInputType = new InputObjectType({
  name: 'UserInputType',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['id'],
  }), {
    // Additional fields
    email: { type: StringType },
    password: { type: StringType },
    emailConfirmed: { type: BooleanType },
    status: { type: StringType },
  }),
});

export default UserInputType;
