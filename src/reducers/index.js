import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import intl from './intl';
import content from './content';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import placementBannerZones from './placementBannerZones';
import banners from './banners';
import sites from './sites';
import users from './users';
import zones from './zones';

export default combineReducers({
  user,
  runtime,
  intl,
  content,
  advertisers,
  placements,
  placementBannerZones,
  campaigns,
  banners,
  sites,
  users,
  zones,
});
