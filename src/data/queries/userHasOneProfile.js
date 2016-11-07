/**
 * Created by Manhhailua on 11/7/16.
 */

import { defaultListArgs, resolver } from 'graphql-sequelize';
import { User } from '../models';
import UserProfileType from '../types/UserProfileType';

const userHasOneProfile = () => ({
  type: UserProfileType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(User.profile, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default userHasOneProfile;
