/**
 * Created by Manhhailua on 10/10/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const PlacementBannerZone = Model.define('PlacementBannerZone', {

  placementId: {
    type: DataType.UUID,
    primaryKey: true,
    unique: 'pbz',
  },
  bannerId: {
    type: DataType.UUID,
    primaryKey: true,
    unique: 'pbz',
  },
  zoneId: {
    type: DataType.UUID,
    primaryKey: true,
    unique: 'pbz',
  },

}, {
  // Additional options
});

export default PlacementBannerZone;
