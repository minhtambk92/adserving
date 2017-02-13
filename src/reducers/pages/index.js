/**
 * Created by Manhhailua on 11/28/16.
 */

import { combineReducers } from 'redux';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import resources from './resources';
import banners from './banners';
import zones from './zones';
import channels from './channels';
import sites from './sites';
import users from './users';

export default combineReducers({
  advertisers,
  campaigns,
  placements,
  channels,
  banners,
  zones,
  sites,
  resources,
  users,
});
