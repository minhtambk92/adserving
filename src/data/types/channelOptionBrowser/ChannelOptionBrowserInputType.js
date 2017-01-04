import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ChannelOptionBrowser } from '../../models';

const ChannelOptionBrowserInputType = new InputObjectType({
  name: 'ChannelOptionBrowserInputType',
  fields: () => Object.assign(attributeFields(ChannelOptionBrowser, {
    // Additional options
    only: ['id', 'name', 'value', 'status'],
  }), {
    // Additional fields
  }),
});

export default ChannelOptionBrowserInputType;
