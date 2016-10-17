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

const Placement = Model.define('Placement', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataType.UUID,
  },
  name: {
    type: DataType.STRING,
    defaultValue: '',
  },
  description: {
    type: DataType.STRING,
    defaultValue: '',
  },
  size: {
    type: DataType.STRING,
    defaultValue: '',
  },
  weight: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  // location: {
  //   type: DataType.STRING,
  //   defaultValue: '',
  // },
  startTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  endTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  // status: {
  //   type: DataType.ENUM(STATUS_ACTIVE, STATUS_INACTIVE),
  //   defaultValue: STATUS_INACTIVE,
  // },

}, {

  // Additional options

});

export default Placement;
