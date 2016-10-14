import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import users from './users';
import  advertisers from './advertisers';
import sites from './sites';
export default combineReducers({
  runtime,
  intl,
  advertisers,
  sites,
  users,
});
