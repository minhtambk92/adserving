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

const FilterBanner = Model.define('FilterBanner', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  filterId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  },
  placementBannerId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  },

}, {

  // additional options

});

export default FilterBanner;
