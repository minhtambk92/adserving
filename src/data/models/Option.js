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

const Option = Model.define('Option', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  value: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  autoLoad: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp',
  deletedAt: 'destroyTime',
  paranoid: true,
});

export default Option;
