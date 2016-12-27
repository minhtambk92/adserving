import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ChannelOptionCategory } from '../../models';

const ChannelOptionCategoryInputTypeWithoutId = new InputObjectType({
  name: 'ChannelOptionCategoryInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(ChannelOptionCategory, {
    only: ['name', 'value', 'status'],
  }), {
    // Additional fields
  }),
});

export default ChannelOptionCategoryInputTypeWithoutId;
