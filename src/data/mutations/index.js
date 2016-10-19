/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import users from './users';
import sites from './sites';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import zones from './zones';
import banners from './banners';

const mutations = new ObjectType({
  name: 'Mutation',
  fields: {
    ...users,
    ...sites,
    ...advertisers,
    ...campaigns,
    ...placements,
    ...banners,
    ...zones,
  },
});

export default mutations;

