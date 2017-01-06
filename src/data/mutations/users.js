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
import UserType from '../types/user/UserType';
import UserInputType from '../types/user/UserInputType';
import UserInputTypeWithoutId from '../types/user/UserInputTypeWithoutId';
import {
  Role,
  User,
  UserProfile,
  UserRole,
} from '../models';

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

        const createdUser = await User.create(newUser, {
          include: [
            { model: UserProfile, as: 'profile' },
          ],
        });

        const userRoles = [];

        // Prepare mediate objects
        for (let i = 0; i < newUser.roles.length; i += 1) {
          const role = await Role.findOne({ where: { uniqueName: newUser.roles[i] } });

          userRoles.push({
            status: 'active',
            userId: createdUser.id,
            roleId: role.id,
          });
        }

        // Set roles to user
        await UserRole.bulkCreate(userRoles);

        // Return recently added user
        opts.where.id = { $eq: createdUser.id };

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

        if (newUser.roles) {
          const userRoles = JSON.parse(newUser.roles);

          userRoles.forEach(async (role) => {
            const userRole = await UserRole.findOne({
              where: {
                userId: args.user.id,
                roleId: role.id,
              },
              paranoid: false,
            });

            if (!userRole && role.isGranted === true) {
              await UserRole.create({
                userId: args.user.id,
                roleId: role.id,
                status: 'active',
              });
            } else if (
              userRole && userRole.getDataValue('deletedAt') !== null && role.isGranted === true
            ) {
              await userRole.restore();
            } else if (userRole && role.isGranted === false) {
              await userRole.destroy();
            }
          });
        }

        if (newUser.profile) {
          await UserProfile.update(newUser.profile, {
            where: {
              userId: args.user.id,
            },
          });
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
