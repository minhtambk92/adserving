/**
 * Created by Manhhailua on 10/5/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Post } from '../models';

const PostInputType = new InputObjectType({
  name: 'PostInput',
  fields: attributeFields(Post, {
    only: ['id', 'author', 'content'],
  }),
});

export default PostInputType;
