import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelValue } from '../../models';
import optionChannelValueBelongsToOptionChannelType from '../../queries/optionChannelValue/optionChannelValueBelongsToOptionChannelType';

const OptionChannelValueType = new ObjectType({
  name: 'OptionChannelValueType',
  fields: () => Object.assign(attributeFields(OptionChannelValue, {
    // Additional options
  }), {
    // Additional fields
    optionChannelType: optionChannelValueBelongsToOptionChannelType(),
  }),
});

export default OptionChannelValueType;
