/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Channel } from '../models';
import channelHasManyOptionChannels from '../queries/channelHasManyOptionChannels';
import channelBelongsToSite from '../queries/channelBelongsToSite';
import channelHasManyBanners from '../queries/channelHasManyBanners';

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
