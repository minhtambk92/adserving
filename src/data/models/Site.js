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
// import {
//   STATUS_ACTIVE,
//   STATUS_INACTIVE,
// } from '../../constants';

const Site = Model.define('Site', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  domain: {
    type: DataType.STRING,
  },
  name: {
    type: DataType.STRING,
  },
  email: {
    type: DataType.STRING,
    validate: {
      isEmail: true,
    },
  },
  description: {
    type: DataType.STRING,
  },
  // status: {
  //   type: DataType.ENUM(STATUS_ACTIVE, STATUS_INACTIVE),
  //   defaultValue: STATUS_ACTIVE,
  // },

}, {

  // Additional options

});

export default Site;
