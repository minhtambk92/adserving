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

const Channel = Model.define('Channel', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  userId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  },
  name: {
    type: DataType.STRING(255),
    defaultValue: '',

  },
  description: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  status: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  compiledLimitation: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  updated: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  aclsUpdated: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },

}, {
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp',
  deletedAt: 'destroyTime',
  paranoid: true,
});

export default Channel;
