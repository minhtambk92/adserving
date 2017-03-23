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
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

const OptionChannelValue = Model.define('OptionChannelValue', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
  },
  value: {
    type: DataType.STRING,
  },
  userId: {
    type: DataType.UUID,
    defaultValue: null,
  },
  isCustomValue: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  isProperties: {
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

export default OptionChannelValue;
