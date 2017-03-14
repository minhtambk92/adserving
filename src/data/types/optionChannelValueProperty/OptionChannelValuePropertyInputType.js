import { GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelValueProperty } from '../../models';

const OptionChannelValuePropertyInputType = new InputObjectType({
  name: 'OptionChannelValuePropertyInputType',
  fields: () => Object.assign(attributeFields(OptionChannelValueProperty, {
    // Additional options
    only: ['id', 'name', 'optionChannelValueId', 'userId', 'description'],
  }), {
    // Additional fields
    status: { type: new NonNull(StringType) },
  }),
});

export default OptionChannelValuePropertyInputType;
