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

const Placement = Model.define('Placement', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  campaignName: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  description: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  size: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  weight: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  location: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  startTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  endTime: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  dateCreated: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  dateUpdated: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },

}, {
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp',
  deletedAt: 'destroyTime',
  paranoid: true,
});

export default Placement;
