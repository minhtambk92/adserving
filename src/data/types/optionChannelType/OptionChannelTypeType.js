import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannelType } from '../../models';
import optionChannelTypeHasManyOptionChannelValues from '../../queries/optionChannelType/optionChannelTypeHasManyOptionChannelValues';
import optionChannelTypeHasManyOptionChannels from '../../queries/optionChannelType/optionChannelTypeHasManyOptionChannels';

const OptionChannelTypeType = new ObjectType({
  name: 'OptionChannelTypeType',
  fields: () => Object.assign(attributeFields(OptionChannelType, {
    // Additional options
  }), {
    // Additional fields
    optionChannelValues: optionChannelTypeHasManyOptionChannelValues(),
    optionChannels: optionChannelTypeHasManyOptionChannels(),
  }),
});

export default OptionChannelTypeType;
