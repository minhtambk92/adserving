import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannel } from '../../models';
import optionChannelBelongsToChannel from '../../queries/optionChannel/optionChannelBelongsToChannel';
import optionChannelBelongToOptionChannelType from '../../queries/optionChannel/optionChannelBelongsToOptionChannelType';

const OptionChannelType = new ObjectType({
  name: 'OptionChannelType',
  fields: () => Object.assign(attributeFields(OptionChannel, {
    // Additional options
  }), {
    // Additional fields
    channel: optionChannelBelongsToChannel(),
    optionChannelType: optionChannelBelongToOptionChannelType(),
  }),
});

export default OptionChannelType;
