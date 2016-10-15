/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import sites from './sites';
import users from './users';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
const mutations = new ObjectType({
  name: 'Mutation',
  fields: {
    ...sites,
    ...users,
    ...advertisers,
    ...campaigns,
    ...placements,
  },
});

export default mutations;

