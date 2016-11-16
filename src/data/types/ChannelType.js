/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Channel } from '../models';
import channelHasManyOptionChannels from '../queries/channelHasManyOptionChannels';
import channelHasManySites from '../queries/channelHasManySites';

const ChannelType = new ObjectType({
  name: 'ChannelType',
  fields: () => Object.assign(attributeFields(Channel, {
    // Additional options
  }), {
    // Additional fields
    options: channelHasManyOptionChannels(),
    sites: channelHasManySites(),
  }),
});

export default ChannelType;
