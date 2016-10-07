import {GraphQLInputObjectType as InputObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";
import {User} from "../models";

const UserInputType = new InputObjectType({
  name: 'UserInputType',
  fields: attributeFields(User, {
    only: ['id', 'username', 'email', 'password'],
  }),
});

export default UserInputType;
