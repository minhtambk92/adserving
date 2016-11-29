/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Channel } from '../../models';
import channelHasManyOptionChannels from '../../queries/channel/channelHasManyOptionChannels';
import channelBelongsToSite from '../../queries/channel/channelBelongsToSite';
import channelHasManyBanners from '../../queries/channel/channelHasManyBanners';

const ChannelType = new ObjectType({
  name: 'ChannelType',
  fields: () => Object.assign(attributeFields(Channel, {
    // Additional options
  }), {
    // Additional fields
    options: channelHasManyOptionChannels(),
    site: channelBelongsToSite(),
    banners: channelHasManyBanners(),
  }),
});

export default ChannelType;
