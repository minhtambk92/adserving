import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelValueProperty } from '../../models';
import optionChannelValuePropertyBelongsToOptionChannelValue from '../../queries/optionChannelValueProperty/optionChannelValuePropertyBelongsToOptionChannelValue';

const OptionChannelValuePropertyType = new ObjectType({
  name: 'OptionChannelValuePropertyType',
  fields: () => Object.assign(attributeFields(OptionChannelValueProperty, {
    // Additional options
  }), {
    // Additional fields
    optionChannelValue: optionChannelValuePropertyBelongsToOptionChannelValue(),
  }),
});

export default OptionChannelValuePropertyType;
