/**
 * Created by Manhhailua on 10/5/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Post } from '../models';

const PostInputTypeWithoutId = new InputObjectType({
  name: 'PostInputWithoutId',
  fields: attributeFields(Post, {
    only: ['author', 'content'],
  }),
});

export default PostInputTypeWithoutId;
