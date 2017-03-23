import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelType } from '../../models';

const OptionChannelTypeInputTypeWithoutId = new InputObjectType({
  name: 'OptionChannelTypeInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(OptionChannelType, {
    only: ['name', 'isInputLink', 'isSelectOption', 'isVariable', 'status', 'userId', 'isMultiSelect'],
  }), {
    // Additional fields
  }),
});

export default OptionChannelTypeInputTypeWithoutId;
