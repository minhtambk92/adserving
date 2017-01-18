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
  html: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  css: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  slot: {
    type: DataType.INTEGER,
    defaultValue: 1,
  },
  height: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  width: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  targetIFrame: {
    type: DataType.STRING,
    validate: {
      isIn: [['_blank', '_top', '0']],
    },
  },
  isShowBannerAgain: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  source: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  isShowCampaignAgain: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  isShowTextBanner: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  isCustomSize: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  supportThirdParty: {
    type: DataType.STRING,
    defaultValue: '0',
    validate: {
      isIn: [['doubleclick', 'max', 'generic', '0']],
    },
  },
  isIncludeDescription: {
    type: DataType.BOOLEAN,
    defaultValue: true,
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
