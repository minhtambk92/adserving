import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import sites from './sites';
import zones from './zones';

export default combineReducers({
  runtime,
  intl,
  sites,
  zones,
});
