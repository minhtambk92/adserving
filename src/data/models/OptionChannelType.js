/**
 * Created by quynd on 1/19/17.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

const OptionChannelType = Model.define('OptionChannelType', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
  },
  isInputLink: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  isSelectOption: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  isVariable: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  userId: {
    type: DataType.UUID,
    defaultValue: null,
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

export default OptionChannelType;
