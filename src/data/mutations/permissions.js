
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import PermissionType from '../types/permission/PermissionType';
import PermissionInputType from '../types/permission/PermissionInputType';
import PermissionInputTypeWithoutId from '../types/permission/PermissionInputTypeWithoutId';
import { Permission } from '../models';

const permissions = {
  createdPermission: {
    type: PermissionType,
    args: {
      permission: { type: PermissionInputTypeWithoutId },
    },
    resolve: resolver(Permission, {
      /* eslint-disable no-shadow */
      async before(options, args) {
        /* eslint-enable no-shadow */
        const opts = options;
        opts.where = options.where || {};
        await Permission.create(args.permission).then((permission) => {
          opts.where.id = { $eq: permission.id };
        });
        return opts;
      },
    }),
  },
  updatedPermission: {
    type: PermissionType,
    args: {
      permission: { type: PermissionInputType },
    },
    resolve: resolver(Permission, {
      /* eslint-disable no-shadow */
      async before(options, args) {
        /* eslint-enable no-shadow */
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.permission.id };
        const newPermission = Object.assign({}, args.permission);
        delete newPermission.id; // Prevent update id

        await Permission.update(newPermission, {
          where: {
            id: args.permission.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedPermission: {
    type: PermissionType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Permission, {
      /* eslint-disable no-shadow */
      before(options, args) {
        /* eslint-enable no-shadow */
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Permission.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default permissions;
