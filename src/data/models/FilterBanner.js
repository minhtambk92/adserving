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

const FilterBanner = Model.define('FilterBanner', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  filterId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  },
  placementBannerId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  },

}, {
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp',
  deletedAt: 'destroyTime',
  paranoid: true,
});

export default FilterBanner;
