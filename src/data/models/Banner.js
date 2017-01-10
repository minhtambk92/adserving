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
  name: {
    type: DataType.STRING,
    defaultValue: '',
  },
  html: {
    type: DataType.TEXT,
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
    type: DataType.TEXT,
    defaultValue: '',
  },
  imageUrl: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  url: {
    type: DataType.STRING,
    defaultValue: '',
  },
  target: {
    type: DataType.STRING,
    validate: {
      isIn: [['_blank', '_self', '_parent', '_top', '']],
    },
  },
  adServer: {
    type: DataType.STRING,
    defaultValue: '',
  },
  isIFrame: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  isCountView: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  isFixIE: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  isDefault: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  isRelative: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  adStore: {
    type: DataType.STRING,
    defaultValue: '',
  },
  isImpressionsBooked: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  impressionsBooked: {
    type: DataType.INTEGER,
    defaultValue: -1,
  },
  isClicksBooked: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  clicksBooked: {
    type: DataType.INTEGER,
    defaultValue: -1,
  },
  isActivationDate: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  activationDate: {
    type: DataType.DATE,
  },
  isExpirationDate: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  expirationDate: {
    type: DataType.DATE,
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

export default Banner;
