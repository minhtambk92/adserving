/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';

import Option from './Option';
import User from './User';
import Role from './Role';
import Permission from './Permission';
import Campaign from './Campaign';
import Placement from './Placement';
import Banner from './Banner';
import Advertiser from './Advertiser';
import Zone from './Zone';
import Channel from './Channel';
import Filter from './Filter';

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  Option,
  User,
  Role,
  Permission,
  Campaign,
  Placement,
  Banner,
  Advertiser,
  Zone,
  Channel,
  Filter,
};
