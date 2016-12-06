import DataType from 'sequelize';
import Model from '../sequelize';

const SharePlacement = Model.define('SharePlacement', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  placementId: {
    type: DataType.UUID,
  },
  shareId: {
    type: DataType.UUID,
  },

}, {
  // Additional options
});

export default SharePlacement;
