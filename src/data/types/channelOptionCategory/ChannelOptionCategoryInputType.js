import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ChannelOptionCategory } from '../../models';

const ChannelOptionCategoryInputType = new InputObjectType({
  name: 'ChannelOptionCategoryInputType',
  fields: () => Object.assign(attributeFields(ChannelOptionCategory, {
    // Additional options
    only: ['id', 'name', 'value'],
  }), {
    // Additional fields
    status: { type: StringType },
  }),
});

export default ChannelOptionCategoryInputType;
