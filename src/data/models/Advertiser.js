/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
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

const Advertiser = Model.define('Advertiser', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataType.STRING,
    validate: { isEmail: true },
  },
  name: {
    type: DataType.STRING,
  },
  contact: {
    type: DataType.STRING,
  },
  description: {
    type: DataType.TEXT,
  },
  isEmailReport: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  isEmailStatus: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  reportInterval: {
    type: DataType.INTEGER,
    defaultValue: 7,
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

  indexes: [
    { fields: ['email'] },
  ],

});

export default Advertiser;
