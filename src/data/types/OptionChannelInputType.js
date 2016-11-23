import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannel } from '../models';

const OptionChannelInputType = new InputObjectType({
  name: 'OptionChannelInputType',
  fields: () => Object.assign(attributeFields(OptionChannel, {
    // Additional options
    only: ['id', 'logical', 'type', 'comparison', 'value', 'channelId'],
  }), {
    // Additional fields
  }),
});

export default OptionChannelInputType;
