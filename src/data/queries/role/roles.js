/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import RoleType from '../../types/role/RoleType';
import { Role } from '../../models';

const roles = {
  type: new List(RoleType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Role, {
    before(options, args, res) {
      const opts = options;
      if (res.body !== undefined) {
        opts.where = res.body.variables;
      }
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default roles;
