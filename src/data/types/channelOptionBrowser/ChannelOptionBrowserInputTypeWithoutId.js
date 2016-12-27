import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ChannelOptionBrowser } from '../../models';

const ChannelOptionBrowserInputTypeWithoutId = new InputObjectType({
  name: 'ChannelOptionBrowserInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(ChannelOptionBrowser, {
    only: ['name', 'value', 'status'],
  }), {
    // Additional fields
  }),
});

export default ChannelOptionBrowserInputTypeWithoutId;
