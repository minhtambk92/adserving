/**
 * Created by Manhhailua on 10/25/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Role } from '../models';
import UserType from '../types/UserType';

const roleBelongsToManyUsers = () => ({
  type: new List(UserType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Role.users, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default roleBelongsToManyUsers;
