import { GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelValue } from '../../models';

const OptionChannelValueInputType = new InputObjectType({
  name: 'OptionChannelValueInputType',
  fields: () => Object.assign(attributeFields(OptionChannelValue, {
    // Additional options
    only: ['id', 'name', 'value', 'optionChannelTypeId', 'userId', 'isProperties', 'isCustomValue'],
  }), {
    // Additional fields
    status: { type: new NonNull(StringType) },
  }),
});

export default OptionChannelValueInputType;
