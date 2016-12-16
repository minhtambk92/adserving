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

const Share = Model.define('Share', {

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
    type: DataType.STRING,
    defaultValue: '',
  },
  css: {
    type: DataType.STRING,
    defaultValue: '',
  },
  width: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  height: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  weight: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataType.STRING,
    defaultValue: '',
  },

}, {

  // Additional options

});

export default Share;
