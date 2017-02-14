/**
 * Created by Quy on 11/15/2016.
 */
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Activity } from '../../models';
import UserType from '../../types/user/UserType';

const activityBelongsToUser = () => ({
  type: UserType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Activity.user, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default activityBelongsToUser;

