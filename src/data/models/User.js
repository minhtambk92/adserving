/**
 * Created by Manhhailua on 10/9/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

const User = Model.define('User', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataType.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
  emailConfirmed: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
