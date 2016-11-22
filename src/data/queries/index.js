/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import resources from './resources';
import menus from './menus';
import menuHeaders from './menuHeaders';
import menuItems from './menuItems';
import options from './options';
import me from './me';
import content from './content';
import news from './news';
import intl from './intl';
import campaigns from './campaigns';
import placements from './placements';
import banners from './banners';
import permissions from './permissions';
import roles from './roles';
import users from './users';
import advertisers from './advertisers';
import sites from './sites';
import zones from './zones';
import channels from './channels';
import filters from './filters';
import placementBannerZones from './placementBannerZones';
import optionChannels from './optionChannels';
import clickImpressions from './clickImpressions';

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
    placementBannerZones,
    optionChannels,
    clickImpressions,
  },
});

export default queries;
