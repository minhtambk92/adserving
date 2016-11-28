import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { UserProfile } from '../../models';

const UserProfileInputType = new InputObjectType({
  name: 'UserProfileInputType',
  fields: Object.assign(attributeFields(UserProfile, {
    // Additional options
    only: ['picture', 'gender', 'location', 'website'],
  }), {
    // Additional fields
    displayName: { type: new NonNull(StringType) },
  }),
});

export default UserProfileInputType;
