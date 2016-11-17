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
import channelHasManyBanners from '../queries/channelHasManyBanners';

const ChannelType = new ObjectType({
  name: 'ChannelType',
  fields: () => Object.assign(attributeFields(Channel, {
    // Additional options
  }), {
    // Additional fields
    options: channelHasManyOptionChannels(),
    sites: channelHasManySites(),
    banners: channelHasManyBanners(),
  }),
});

export default ChannelType;
