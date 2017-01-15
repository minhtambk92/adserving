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
import content from './content';
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
import filters from './filters';
import optionChannels from './optionChannel/optionChannels';
import tracks from './track/tracks';
import shares from './share/shares';
import channelOptionBrowsers from './channelOptionBrowser/channelOptionBrowsers';
import channelOptionCategories from './channelOptionCategory/channelOptionCategories';
import bannerHtmlTypes from './bannerHtmlType/bannerHtmlTypes';
import bannerTypes from './bannerType/bannerTypes';
import adsServers from './adsServer/adsServers';
import zoneTypes from './zoneType/zoneTypes';
import zoneSizeTypes from './zoneSizeType/zoneSizeTypes';

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
    content,
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
    filters,
    optionChannels,
    tracks,
    shares,
    channelOptionBrowsers,
    channelOptionCategories,
    bannerHtmlTypes,
    bannerTypes,
    adsServers,
    zoneTypes,
    zoneSizeTypes,
  },
});

export default queries;
