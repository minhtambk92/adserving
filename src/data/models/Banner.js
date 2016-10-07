/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from "sequelize";
import Model from "../sequelize";

const Banner = Model.define('Banner', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  contentType: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  name: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  fileUrl: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  urlClick: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  htmlTemplate: {
    type: DataType.STRING(255),
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
    type: DataType.STRING(255),
    defaultValue: '',
  },
  location: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  urlTarget: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  description: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  keyword: {
    type: DataType.STRING(255),
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
    type: DataType.STRING(255),
    defaultValue: '',
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp',
  deletedAt: 'destroyTime',
  paranoid: true,
});

export default Banner;
