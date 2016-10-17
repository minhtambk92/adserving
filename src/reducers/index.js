import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import users from './users';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import  banners from  './banners';
import sites from './sites';
import zones from './zones';
export default combineReducers({
  runtime,
  intl,
  advertisers,
  placements,
  campaigns,
  banners,
  sites,
  users,
  zones,
});
