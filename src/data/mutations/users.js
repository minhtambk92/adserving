/**
 * Created by Quy on 10/7/2016.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import {
  resolver,
} from 'graphql-sequelize';
import { genSaltSync, hashSync } from 'bcrypt';
import UserType from '../types/UserType';
import UserInputType from '../types/UserInputType';
import UserInputTypeWithoutId from '../types/UserInputTypeWithoutId';
import { User, UserRole } from '../models';

const users = {
  createdUser: {
    type: UserType,
    args: {
      user: { type: UserInputTypeWithoutId },
    },
    resolve: resolver(User, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};

        // Create password
        const salt = genSaltSync();
        const newUser = Object.assign({}, args.user);
        newUser.password = hashSync(newUser.password, salt);

        const userRoles = [];

        await User.create(newUser).then(user => {
          // Return recently added user
          opts.where.id = { $eq: user.id };

          // Prepare mediate objects
          for (let i = 0; i < newUser.roleIds.length; i += 1) {
            userRoles.push({
              status: 'active',
              userId: user.id,
              roleId: newUser.roleIds[i],
            });
          }
        });

        // Set roles to user
        await UserRole.bulkCreate(userRoles);

        return opts;
      },
    }),
  },
  updatedUser: {
    type: UserType,
    args: {
      user: { type: UserInputType },
    },
    resolve: resolver(User, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.user.id };

        const newUser = Object.assign({}, args.user);
        delete newUser.id; // Prevent update id

        if (newUser.password) {
          const salt = genSaltSync();
          newUser.password = hashSync(newUser.password, salt);
        }

        await User.update(newUser, {
          where: {
            id: args.user.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedUser: {
    type: UserType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(User, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };
        return opts;
      },
      after(result, args) {
        User.destroy({ where: { id: args.id } });
        return result;
      },
    }),
  },
};

export default users ;
