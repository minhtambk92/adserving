/**
 * Created by Quy on 11/15/2016.
 */
import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Channel } from '../models';
import SiteType from '../types/SiteType';

const channelHasManySites = () => ({
  type: new List(SiteType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Channel.sites, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default channelHasManySites;
