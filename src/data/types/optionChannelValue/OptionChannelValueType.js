import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelValue } from '../../models';

const OptionChannelValueType = new ObjectType({
  name: 'OptionChannelValueType',
  fields: () => Object.assign(attributeFields(OptionChannelValue, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default OptionChannelValueType;
