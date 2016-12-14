/**
 * Created by Manhhailua on 11/28/16.
 */

import { combineReducers } from 'redux';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import banners from './banners';
import zones from './zones';
import channels from './channels';
import sites from './sites';

export default combineReducers({
  advertisers,
  campaigns,
  placements,
  channels,
  banners,
  zones,
  sites,
});