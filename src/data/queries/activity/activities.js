/**
 * Created by quynd on 1/11/17.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ActivityType from '../../types/activity/ActivityType';
import { Activity } from '../../models';

const activities = {
  type: new List(ActivityType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Activity, {
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

export default activities;
