/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const Role = Model.define('Role', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  uniqueName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataType.TEXT,
    allowNull: false,
  },

}, {

  // Additional options

});

export default Role;
