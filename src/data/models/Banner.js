/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

const Banner = Model.define('Banner', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    defaultValue: '',
  },
  html: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  width: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  height: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  keyword: {
    type: DataType.STRING,
    defaultValue: '',
  },
  weight: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  type: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'html',
    validate: {
      isIn: [['html', 'img']],
    },
  },
  imageUrl: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  url: {
    type: DataType.STRING,
    defaultValue: '',
  },
  target: {
    type: DataType.STRING,
    validate: {
      isIn: [['_blank', '_self', '_parent', '_top', '']],
    },
  },
  adServer: {
    type: DataType.STRING,
    defaultValue: '',
  },
  bannerHTMLType: {
    type: DataType.STRING,
    defaultValue: '',
  },
  isIFrame: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  countView: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  fixIE: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  isDefault: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  isRelative: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  adStore: {
    type: DataType.STRING,
    defaultValue: '',
  },
  impressionsBooked: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  impressionsBookedValue: {
    type: DataType.STRING,
    defaultValue: 'unlimited',
  },
  clicksBooked: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },
  clicksBookedValue: {
    type: DataType.STRING,
    defaultValue: 'unlimited',
  },
  activationDate: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '0',
    validate: {
      isIn: [['1', '0']],
    },
  },
  activationDateValue: {
    type: DataType.DATE,
  },
  expirationDate: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '0',
    validate: {
      isIn: [['1', '0']],
    },
  },
  expirationDateValue: {
    type: DataType.DATE,
  },
  // clickImpressionsUrl: {
  //   type: DataType.ARRAY(DataType.STRING),
  //   defaultValue: [],
  // },
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

export default Banner;
