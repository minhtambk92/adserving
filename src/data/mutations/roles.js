/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import RoleType from '../types/RoleType';
import RoleInputType from '../types/RoleInputType';
import RoleInputTypeWithoutId from '../types/RoleInputTypeWithoutId';
import { Role } from '../models';

const roles = {
  createdRole: {
    type: RoleType,
    args: {
      role: { type: RoleInputTypeWithoutId },
    },
    resolve: resolver(Role, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Role.create(args.role).then(role => {
          opts.where.id = { $eq: role.id };
        });
        return opts;
      },
    }),
  },
  updatedRole: {
    type: RoleType,
    args: {
      role: { type: RoleInputType },
    },
    resolve: resolver(Role, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.role.id };

        const newRole = Object.assign({}, args.role);
        delete newRole.id; // Prevent update id

        await Role.update(newRole, {
          where: {
            id: args.role.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedRole: {
    type: RoleType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Role, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Role.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default roles;
