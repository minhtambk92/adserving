import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelValue } from '../../models';

const OptionChannelValueInputTypeWithoutId = new InputObjectType({
  name: 'OptionChannelValueInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(OptionChannelValue, {
    only: ['name', 'value', 'status'],
  }), {
    // Additional fields
  }),
});

export default OptionChannelValueInputTypeWithoutId;
