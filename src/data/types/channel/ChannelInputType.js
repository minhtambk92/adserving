import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Channel } from '../../models';

const ChannelInputType = new InputObjectType({
  name: 'ChannelInputType',
  fields: () => Object.assign(attributeFields(Channel, {
    // Additional options
    only: ['id', 'name', 'description', 'siteId'],
  }), {
    // Additional fields
    status: { type: StringType },
  }),
});

export default ChannelInputType;
