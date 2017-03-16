/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import resources from './resources/resources';
import menus from './menu/menus';
import menuHeaders from './menu/menuHeaders';
import menuItems from './menuItem/menuItems';
import options from './option/options';
import me from './me';
import news from './news';
import intl from './intl';
import campaigns from './campaign/campaigns';
import placements from './placement/placements';
import banners from './banner/banners';
import permissions from './permission/permissions';
import roles from './role/roles';
import users from './user/users';
import advertisers from './advertiser/advertisers';
import sites from './site/sites';
import zones from './zone/zones';
import channels from './channel/channels';
import optionChannels from './optionChannel/optionChannels';
import tracks from './track/tracks';
import shares from './share/shares';
import bannerHtmlTypes from './bannerHtmlType/bannerHtmlTypes';
import bannerTypes from './bannerType/bannerTypes';
import adsServers from './adsServer/adsServers';
import zoneTypes from './zoneType/zoneTypes';
import zoneSizeTypes from './zoneSizeType/zoneSizeTypes';
import characterSets from './characterSet/characterSets';
import optionChannelTypes from './optionChannelType/optionChannelTypes';
import optionChannelValues from './optionChannelValue/optionChannelValues';
import activities from './activity/activities';
import optionChannelValueProperties from './optionChannelValueProperty/optionChannelValueProperties';

const queries = new ObjectType({
  name: 'Query',
  fields: {
    resources,
    menus,
    menuHeaders,
    menuItems,
    options,
    me,
    roles,
    permissions,
    news,
    intl,
    campaigns,
    placements,
    banners,
    users,
    advertisers,
    sites,
    zones,
    channels,
    optionChannels,
    tracks,
    shares,
    bannerHtmlTypes,
    bannerTypes,
    adsServers,
    zoneTypes,
    zoneSizeTypes,
    characterSets,
    optionChannelTypes,
    optionChannelValues,
    activities,
    optionChannelValueProperties,
  },
});

export default queries;
