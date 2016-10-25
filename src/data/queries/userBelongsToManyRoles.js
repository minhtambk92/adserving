/**
 * Created by Manhhailua on 10/25/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { User } from '../models';
import RoleType from '../types/RoleType';

const userBelongsToManyRoles = () => ({
  type: new List(RoleType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(User.roles, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default userBelongsToManyRoles;
