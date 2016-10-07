/**
 * Created by Manhhailua on 10/5/16.
 */

import DataTypes from 'sequelize';
import Model from '../sequelize';

const Post = Model.define('Post', {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  author: {
    type: DataTypes.STRING,
  },

  content: {
    type: DataTypes.TEXT,
  },

});

export default Post;
