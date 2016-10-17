import {GraphQLInputObjectType as InputObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";
import {User} from "../models";
const UserInputTypeWithoutId = new InputObjectType({
  name: 'UserInputTypeWithoutId',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['email','username', 'password','emailConfirmed','status'],
  }), {
    // additional fields
  }),
});

export default UserInputTypeWithoutId;
