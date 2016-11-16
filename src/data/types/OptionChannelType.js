import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannel } from '../models';
import optionChannelBelongsToChannel from '../queries/optionChannelBelongsToChannel';

const OptionChannelType = new ObjectType({
  name: 'OptionChannelType',
  fields: () => Object.assign(attributeFields(OptionChannel, {
    // Additional options
  }), {
    // Additional fields
    channel: optionChannelBelongsToChannel(),
  }),
});

export default OptionChannelType;
