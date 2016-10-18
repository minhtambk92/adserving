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

const Advertisers = Model.define('Advertisers', {

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
    defaultValue: '',
  },
  contact: {
    type: DataType.STRING,
    defaultValue: '',
  },
  description: {
    type: DataType.STRING,
    defaultValue: '',
  },
  status: {
    type: DataType.STRING,
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

export default Advertisers;
