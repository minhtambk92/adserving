import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelValueProperty } from '../../models';

const OptionChannelValuePropertyInputTypeWithoutId = new InputObjectType({
  name: 'OptionChannelValuePropertyInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(OptionChannelValueProperty, {
    only: ['name', 'status', 'optionChannelValueId', 'userId', 'description'],
  }), {
    // Additional fields
  }),
});

export default OptionChannelValuePropertyInputTypeWithoutId;
