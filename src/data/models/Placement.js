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
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  width: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  height: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  weight: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  startTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  endTime: {
    type: DataType.DATE,
    defaultValue: null,
  },
  status: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: STATUS_INACTIVE,
    validate: {
      isIn: [[STATUS_ACTIVE, STATUS_INACTIVE]],
    },
  },

}, {

  // Additional options

});

export default Placement;
