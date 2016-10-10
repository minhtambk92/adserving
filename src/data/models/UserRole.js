/**
 * Created by Manhhailua on 10/9/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const UserRole = Model.define('UserRole', {

  userId: {
    type: DataType.UUID,
    primaryKey: true,
  },
  roleId: {
    type: DataType.UUID,
    primaryKey: true,
  },

}, {

  // Additional options

});

export default UserRole;
