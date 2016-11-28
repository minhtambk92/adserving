import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { OptionChannel } from '../models';

const OptionChannelInputTypeWithoutId = new InputObjectType({
  name: 'OptionChannelInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(OptionChannel, {
    only: ['name', 'logical', 'type', 'comparison', 'value', 'channelId'],
  }), {
    // Additional fields
  }),
});

export default OptionChannelInputTypeWithoutId;
