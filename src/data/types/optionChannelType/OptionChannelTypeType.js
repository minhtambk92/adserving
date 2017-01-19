import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelType } from '../../models';
import optionChannelTypeHasManyOptionChannelValues from '../../queries/optionChannelType/optionChannelTypeHasManyOptionChannelValues';

const OptionChannelTypeType = new ObjectType({
  name: 'OptionChannelTypeType',
  fields: () => Object.assign(attributeFields(OptionChannelType, {
    // Additional options
  }), {
    // Additional fields
    optionChannelValues: optionChannelTypeHasManyOptionChannelValues(),
  }),
});

export default OptionChannelTypeType;
