/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';

const mutations = new ObjectType({
  name: 'Mutation',
  fields: {
    // additional fields
  },
});

export default mutations;

