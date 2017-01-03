/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import less from 'less';
import Model from '../sequelize';

const Share = Model.define('Share', {

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
  css: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  outputCss: {
    type: DataType.TEXT,
    defaultValue: '',
  },
  width: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  height: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  classes: {
    type: DataType.STRING,
    defaultValue: '',
  },
  weight: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  type: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'single',
    validate: {
      isIn: [['single', 'multiple']],
    },
  },
  description: {
    type: DataType.TEXT,
    defaultValue: '',
  },

}, {

  // Additional options
  hooks: {
    async beforeBulkUpdate(options) {
      const inputLess = `#share-${options.where.id}{${options.attributes.css}}`;
      const { css } = await less.render(inputLess);

      // Assign compiled css to outputCss
      Object.assign(options.attributes, { outputCss: css });
    },
  },

});

export default Share;
