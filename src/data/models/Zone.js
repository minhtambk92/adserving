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

const Zone = Model.define('Zone', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  userId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  },
  name: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  description: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  type: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  html: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  css: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  slot: {
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

export default Zone;
