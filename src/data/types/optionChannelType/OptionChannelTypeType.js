import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelType } from '../../models';

const OptionChannelTypeType = new ObjectType({
  name: 'OptionChannelTypeType',
  fields: () => Object.assign(attributeFields(OptionChannelType, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default OptionChannelTypeType;
