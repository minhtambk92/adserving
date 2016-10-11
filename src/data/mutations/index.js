/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import sites from './sites';

const mutations = new ObjectType({
  name: 'Mutation',
  fields: {
    ...sites,
  },
});

export default mutations;

