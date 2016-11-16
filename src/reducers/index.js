import { combineReducers } from 'redux';
import resources from './resources';
import user from './user';
import me from './me';
import runtime from './runtime';
import intl from './intl';
import content from './content';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import placementBannerZones from './placementBannerZones';
import banners from './banners';
import sites from './sites';
import roles from './roles';
import users from './users';
import zones from './zones';
import channels from './channels';
import optionChannels from './optionChannels';

export default combineReducers({
  resources,
  user,
  me,
  runtime,
  intl,
  content,
  advertisers,
  placements,
  placementBannerZones,
  campaigns,
  banners,
  sites,
  roles,
  users,
  zones,
  channels,
  optionChannels,
});
