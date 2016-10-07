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

const Campaign = Model.define('Campaign', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  advertiserId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  },
  userId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  },
  name: {
    type: DataType.STRING(255),
    defaultValue: '',

  },
  activeTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  expireTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  views: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  clicks: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  weight: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  targetImpression: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  targetClick: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  targetConversion: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  revenue: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  revenueType: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataType.STRING(255),
    defaultValue: 'inactive',
  },
  hostedViews: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  hostedClick: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  viewWindow: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  clickWindow: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  setMaxCpm: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  setPerDayCpm: {
    type: DataType.INTEGER,
    defaultValue: 0,
  }

}, {
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp',
  deletedAt: 'destroyTime',
  paranoid: true,
});

export default Campaign;
