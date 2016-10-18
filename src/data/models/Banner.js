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

const Banner = Model.define('Banner', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataType.UUID,
    defaultValue: '',
  },
  name: {
    type: DataType.STRING,
    defaultValue: '',
  },
  html: {
    type: DataType.STRING,
    defaultValue: '',
  },

  width: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  height: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  keyword: {
    type: DataType.STRING,
    defaultValue: '',
  },
  weight: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataType.STRING,
    defaultValue: '',
  },
  // advertiserId: {
  //   type: DataType.UUID,
  //   defaultValue: '',
  // },
  // status: {
  //   type: DataType.ENUM(STATUS_ACTIVE, STATUS_INACTIVE),
  //   defaultValue: STATUS_INACTIVE,
  // },

}, {

  // Additional options

});

export default Banner;
