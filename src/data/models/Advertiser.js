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

const Advertisers = Model.define('Advertisers', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  email: {
    type: DataType.STRING(255),
    validate: {isEmail: true},
  },
  name: {
    type: DataType.STRING(255),
    defaultValue: '',

  },
  contact: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  description: {
    type: DataType.STRING(255),
    defaultValue: '',
  },
  status: {
    type: DataType.STRING(255),
    defaultValue: 'inactive',
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp',
  deletedAt: 'destroyTime',
  paranoid: true,

  indexes: [
    {fields: ['email']},
  ],

});

export default Advertisers;
