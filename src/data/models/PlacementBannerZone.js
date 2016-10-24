/**
 * Created by Manhhailua on 10/10/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const PlacementBannerZone = Model.define('PlacementBannerZone', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  placementId: {
    type: DataType.UUID,
    unique: 'pbz',
  },
  bannerId: {
    type: DataType.UUID,
    unique: 'pbz',
  },
  zoneId: {
    type: DataType.UUID,
    unique: 'pbz',
  },

}, {
  // Additional options
});

export default PlacementBannerZone;
