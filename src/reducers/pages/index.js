/**
 * Created by Manhhailua on 11/28/16.
 */

import { combineReducers } from 'redux';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';

export default combineReducers({
  advertisers,
  campaigns,
  placements,
});
