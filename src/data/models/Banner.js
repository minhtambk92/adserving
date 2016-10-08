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

const Banner = Model.define('Banner', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  contentType: {
    type: DataType.STRING,
    defaultValue: '',
  },
  name: {
    type: DataType.STRING,
    defaultValue: '',
  },
  fileUrl: {
    type: DataType.STRING,
    defaultValue: '',
  },
  urlClick: {
    type: DataType.STRING,
    defaultValue: '',
  },
  htmlTemplate: {
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
  weight: {
    type: DataType.STRING,
    defaultValue: '',
  },
  location: {
    type: DataType.STRING,
    defaultValue: '',
  },
  urlTarget: {
    type: DataType.STRING,
    defaultValue: '',
  },
  description: {
    type: DataType.STRING,
    defaultValue: '',
  },
  keyword: {
    type: DataType.STRING,
    defaultValue: '',
  },
  iframeFriendly: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  typeBanner: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  startTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  endTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  activationTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  expirationTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  bannerViews: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  bannerClicks: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  isCountViews: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  isDefault: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataType.ENUM(STATUS_ACTIVE, STATUS_INACTIVE),
    defaultValue: STATUS_INACTIVE,
  },

}, {

  // additional options

});

export default Banner;
