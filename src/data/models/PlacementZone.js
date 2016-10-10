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

const PlacementZone = Model.define('PlacementZone', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  placementId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  },
  zoneId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  },

}, {

  // Additional options

});

export default PlacementZone;
