/**
 * Created by quynd on 1/11/17.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import AdsServerType from '../../types/adsServer/AdsServerType';
import { AdsServer } from '../../models';

const adsServers = {
  type: new List(AdsServerType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(AdsServer, {
    before(options, args, res) {
      const opts = options;
      opts.where = res.body.variables;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default adsServers;
