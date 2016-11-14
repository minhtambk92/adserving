import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Channel } from '../models';

const ChannelInputTypeWithoutId = new InputObjectType({
  name: 'ChannelInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Channel, {
    only: ['name', 'description', 'status'],
  }), {
    // Additional fields
  }),
});

export default ChannelInputTypeWithoutId;
