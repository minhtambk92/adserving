/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import sites from './sites';
import users from './users';
import advertisers from './advertisers';
const mutations = new ObjectType({
  name: 'Mutation',
  fields: {
    ...sites,
    ...users,
    ...advertisers,
  },
});

export default mutations;

