/**
 * Created by Quy on 10/7/2016.
 */
import {
  GraphQLID as IDType,
  GraphQLString as StringType,
} from 'graphql';
import {
  resolver,
} from 'graphql-sequelize';
import UserType from '../types/UserType';
import UserInputType from '../types/UserInputType';
import UserInputTypeWithoutId from '../types/UserInputTypeWithoutId';
import { User } from '../models';

const users = {
  userRegister: {
    type: UserType,
    args: {
      user: { type: UserInputTypeWithoutId },
    },
    resolve: resolver(User, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await User.create(args.user).then(user => {
          opts.where.id = { $eq: user.id };
        });
        return opts;
      },
    }),
  },
  createdUser: {
    type: UserType,
    args: {
      site: { type: UserInputTypeWithoutId },
    },
    resolve: resolver(User, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await User.create(args.site).then(site => {
          opts.where.id = { $eq: site.id };
        });
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
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.user.id };
        User.upsert(args.user);
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
  findByEmail: {
    type: UserType,
    args: {
      email: { type: StringType },
    },
    resolve: resolver(User, {
      async before(options) {
        const opts = options;
        opts.where = options.where || {};
        return opts;
      },
      after(result, args) {
        User.find({ where: { email: args.email } });
        return result;
      },
    }),
  },
  findById: {
    type: UserType,
    args: {
      id: { type: StringType },
    },
    resolve: resolver(User, {
      async before(options) {
        const opts = options;
        opts.where = options.where || {};
        return opts;
      },
      after(result, args) {
        User.find({ where: { id: args.id } });
        return result;
      },
    }),
  },
};

export default users ;
