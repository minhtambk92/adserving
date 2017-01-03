/**
 * Created by Manhhailua on 10/18/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

const Resource = Model.define('Resource', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  uniqueName: {
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  },
  modelName: {
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  hasMeta: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  description: {
    type: DataType.TEXT,
    defaultValue: '',
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

export default Resource;
