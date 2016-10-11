import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import sites from './sites';

export default combineReducers({
  runtime,
  intl,
  sites,
});
