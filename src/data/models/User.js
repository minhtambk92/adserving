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
    validate: { isEmail: true },
  },
  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataType.ENUM(STATUS_ACTIVE, STATUS_INACTIVE),
    defaultValue: STATUS_INACTIVE,
  },

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
