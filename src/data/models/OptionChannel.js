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

const OptionChannel = Model.define('OptionChannel', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  logical: {
    type: DataType.STRING,
    defaultValue: 'and',
    validate: {
      isIn: [['and', 'or']],
    },
  },
  type: {
    type: DataType.STRING,
    defaultValue: '',
  },
  comparison: {
    type: DataType.STRING,
    defaultValue: '==',
    validate: {
      isIn: [['==', '!=', '=~', '!~']],
    },
  },
  value: {
    type: DataType.TEXT,
    defaultValue: '',
  },
}, {

  // Additional options

});

export default OptionChannel;
