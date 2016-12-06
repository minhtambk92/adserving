/**
 * Created by Manhhailua on 10/10/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const PlacementBanner = Model.define('PlacementBanner', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  placementId: {
    type: DataType.UUID,
  },
  bannerId: {
    type: DataType.UUID,
  },

}, {
  // Additional options
});

export default PlacementBanner;
