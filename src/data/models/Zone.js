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

const Zone = Model.define('Zone', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    defaultValue: '',
  },
  description: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  type: {
    type: DataType.STRING,
    allowNull: false,
  },
  html: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  css: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  slot: {
    type: DataType.STRING,
    defaultValue: '',
  },
  height: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  width: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  sizeText: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  sizeValue: {
    type: DataType.STRING,
    defaultValue: '',
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

export default Zone;
