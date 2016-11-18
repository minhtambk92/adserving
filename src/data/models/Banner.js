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
  target: {
    type: DataType.STRING,
    defaultValue: '',
  },
  adServer: {
    type: DataType.STRING,
    defaultValue: '',
  },
  bannerHTMLType: {
    type: DataType.STRING,
    defaultValue: '',
  },
  userIFrame: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '1',
    validate: {
      isIn: [['1', '0']],
    },
  },
  // countView: {
  //   type: DataType.STRING,
  //   allowNull: false,
  //   defaultValue: '0',
  //   validate: {
  //     isIn: [['1', '0']],
  //   },
  // },
  // fixIE: {
  //   type: DataType.STRING,
  //   allowNull: false,
  //   defaultValue: '0',
  //   validate: {
  //     isIn: [['1', '0']],
  //   },
  // },
  // isDefault: {
  //   type: DataType.STRING,
  //   allowNull: false,
  //   defaultValue: '0',
  //   validate: {
  //     isIn: [['1', '0']],
  //   },
  // },
  // isRelative: {
  //   type: DataType.STRING,
  //   allowNull: false,
  //   defaultValue: '0',
  //   validate: {
  //     isIn: [['1', '0']],
  //   },
  // },
  // adStore: {
  //   type: DataType.STRING,
  //   defaultValue: '',
  // },
  // impressionsBooked: {
  //   type: DataType.STRING,
  //   defaultValue: 'unlimited',
  // },
  // clicksBooked: {
  //   type: DataType.STRING,
  //   defaultValue: 'unlimited',
  // },
  // activationDate: {
  //   type: DataType.STRING,
  //   defaultValue: 'immediately',
  // },
  // expirationData: {
  //   type: DataType.STRING,
  //   defaultValue: 'never',
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
