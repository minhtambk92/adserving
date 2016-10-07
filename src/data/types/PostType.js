/**
 * Created by Manhhailua on 10/5/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Post } from '../models';
import readers from '../queries/readers';

const PostType = new ObjectType({
  name: 'Post',
  fields: Object.assign(attributeFields(Post), {
    readers,
  }),
});

export default PostType;
