import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { User } from '../../models';
import ActivityType from '../../types/activity/ActivityType';

const advertiserHasManyActivities = () => ({
  type: new List(ActivityType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(User.activities, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default advertiserHasManyActivities;
