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

const Channel = Model.define('Channel', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  },
  name: {
    type: DataType.STRING,
    defaultValue: '',
  },
  description: {
    type: DataType.STRING,
    defaultValue: '',
  },
  status: {
    type: DataType.ENUM(STATUS_ACTIVE, STATUS_INACTIVE),
    defaultValue: STATUS_INACTIVE,
  },
  compiledLimitation: {
    type: DataType.STRING,
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

  // Additional options

});

export default Channel;
