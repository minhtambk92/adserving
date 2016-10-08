/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import UserMeta from './UserMeta';

const User = Model.define('User', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataType.STRING,
    validate: { isEmail: true },
  },
  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataType.ENUM(STATUS_ACTIVE, STATUS_INACTIVE),
    defaultValue: STATUS_INACTIVE,
  },

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

User.login = User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.claim = User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.profile = User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.meta = User.hasMany(UserMeta, {
  foreignKey: 'userId',
  as: 'meta',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default User;
