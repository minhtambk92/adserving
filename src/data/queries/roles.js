/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import RoleType from '../types/RoleType';
import { Role } from '../models';

const roles = {
  type: new List(RoleType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Role, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default roles;
