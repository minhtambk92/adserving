import { combineReducers } from 'redux';
import resources from './resources';
import menus from './menus';
import user from './user';
import me from './me';
import runtime from './runtime';
import intl from './intl';
import content from './content';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import placementBanners from './placementBanners';
import banners from './banners';
import sites from './sites';
import roles from './roles';
import users from './users';
import zones from './zones';
import channels from './channels';
import optionChannels from './optionChannels';
import tracks from './tracks';
import shares from './shares';
import sharePlacements from './sharePlacements';

import page from './pages';

export default combineReducers({
  resources,
  menus,
  user,
  me,
  runtime,
  intl,
  content,
  advertisers,
  placements,
  placementBanners,
  campaigns,
  banners,
  sites,
  roles,
  users,
  zones,
  channels,
  optionChannels,
  tracks,
  shares,
  sharePlacements,
  page,
});
