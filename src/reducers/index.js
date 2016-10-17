import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import intl from './intl';
import content from './content';
import sites from './sites';
import zones from './zones';

export default combineReducers({
  user,
  runtime,
  intl,
  content,
  sites,
  zones,
});
