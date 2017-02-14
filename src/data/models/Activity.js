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

const Activity = Model.define('Activity', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  action: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  subject: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  subjectId: {
    type: DataType.UUID,
    defaultValue: null,
  },
  other: {
    type: DataType.TEXT,
    defaultValue: '',
  },

}, {

});

export default Activity;
