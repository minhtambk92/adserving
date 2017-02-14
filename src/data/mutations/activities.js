
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ActivityType from '../types/activity/ActivityType';
import ActivityInputType from '../types/activity/ActivityInputType';
import ActivityInputTypeWithoutId from '../types/activity/ActivityInputTypeWithoutId';
import { Activity } from '../models';

const activities = {
  createdActivity: {
    type: ActivityType,
    args: {
      activity: { type: ActivityInputTypeWithoutId },
    },
    resolve: resolver(Activity, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Activity.create(args.activity).then(activity => {
          opts.where.id = { $eq: activity.id };
        });
        return opts;
      },
    }),
  },
  updatedActivity: {
    type: ActivityType,
    args: {
      activity: { type: ActivityInputType },
    },
    resolve: resolver(Activity, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.activity.id };
        const newActivity = Object.assign({}, args.activity);
        delete newActivity.id; // Prevent update id

        await Activity.update(newActivity, {
          where: {
            id: args.activity.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedActivity: {
    type: ActivityType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Activity, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Activity.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default activities;
