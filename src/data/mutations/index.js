/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import resources from './resources';
import roles from './roles';
import users from './users';
import sites from './sites';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import zones from './zones';
import banners from './banners';
import channels from './channels';
import optionChannels from './optionChannels';
import tracks from './tracks';
import shares from './shares';
import options from './options';
import permissions from './permissions';
import bannerHtmlTypes from './bannerHtmlTypes';
import bannerTypes from './bannerTypes';
import adsServers from './adsServers';
import zoneTypes from './zoneTypes';
import zoneSizeTypes from './zoneSizeTypes';
import characterSets from './characterSets';
import optionChannelTypes from './optionChannelTypes';
import optionChannelValues from './optionChannelValues';
import activities from './activities';
import optionChannelValueProperties from './optionChannelValueProperties';

const mutations = new ObjectType({
  name: 'Mutation',
  fields: {
    ...resources,
    ...roles,
    ...users,
    ...sites,
    ...advertisers,
    ...campaigns,
    ...placements,
    ...banners,
    ...zones,
    ...channels,
    ...optionChannels,
    ...tracks,
    ...shares,
    ...options,
    ...permissions,
    ...bannerHtmlTypes,
    ...bannerTypes,
    ...adsServers,
    ...zoneTypes,
    ...zoneSizeTypes,
    ...characterSets,
    ...optionChannelTypes,
    ...optionChannelValues,
    ...activities,
    ...optionChannelValueProperties,
  },
});

export default mutations;

