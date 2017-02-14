import { GraphQLInputObjectType as InputObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelType } from '../../models';

const OptionChannelTypeInputType = new InputObjectType({
  name: 'OptionChannelTypeInputType',
  fields: () => Object.assign(attributeFields(OptionChannelType, {
    // Additional options
    only: ['id', 'name', 'userId'],
  }), {
    // Additional fields
    isInputLink: { type: new NonNull(BooleanType) },
    isSelectOption: { type: new NonNull(BooleanType) },
    isVariable: { type: new NonNull(BooleanType) },
    status: { type: new NonNull(StringType) },
  }),
});

export default OptionChannelTypeInputType;
