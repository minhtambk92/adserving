import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Channel } from '../../models';

const ChannelInputType = new InputObjectType({
  name: 'ChannelInputType',
  fields: () => Object.assign(attributeFields(Channel, {
    // Additional options
    only: ['id', 'name', 'description'],
  }), {
    // Additional fields
    status: { type: new NonNull(StringType) },
  }),
});

export default ChannelInputType;
