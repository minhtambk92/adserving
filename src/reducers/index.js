import { combineReducers } from 'redux';
import resources from './resources';
import menus from './menus';
import user from './user';
import me from './me';
import runtime from './runtime';
import intl from './intl';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import banners from './banners';
import sites from './sites';
import roles from './roles';
import users from './users';
import zones from './zones';
import channels from './channels';
import channelOptionBrowsers from './channelOptionBrowsers';
import channelOptionCategories from './channelOptionCategories';
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

import page from './pages';

export default combineReducers({
  resources,
  menus,
  user,
  me,
  runtime,
  intl,
  advertisers,
  placements,
  campaigns,
  banners,
  sites,
  roles,
  users,
  zones,
  channels,
  optionChannels,
  channelOptionBrowsers,
  tracks,
  shares,
  page,
  channelOptionCategories,
  options,
  permissions,
  bannerHtmlTypes,
  bannerTypes,
  adsServers,
  zoneTypes,
  zoneSizeTypes,
  characterSets,
  optionChannelTypes,
  optionChannelValues,
});
