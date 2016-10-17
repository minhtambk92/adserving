import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
  GraphQLString as StringType
} from "graphql";
import {attributeFields} from "graphql-sequelize";
import {User} from "../models";
const UserInputType = new InputObjectType({
  name: 'UserInputType',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    only: ['id', 'email','username', 'password'],
  }), {
    // additional fields
  }),
});

export default UserInputType;
