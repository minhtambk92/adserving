/**
 * Created by Manhhailua on 10/18/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

const ResourcePermission = Model.define('ResourcePermission', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  authorizedFor: {
    type: DataType.UUID,
    allowNull: false,
  },
  authorizedId: {
    type: DataType.UUID,
    allowNull: false,
  },
  resource: { // Resource type id
    type: DataType.UUID,
    allowNull: false,
  },
  resourceEntityId: { // Resource entity id
    type: DataType.UUID,
    allowNull: false,
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

export default ResourcePermission;
