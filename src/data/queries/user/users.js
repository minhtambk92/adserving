/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import UserType from '../../types/user/UserType';
import { User } from '../../models';

const users = {
  type: new List(UserType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(User, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default users;
