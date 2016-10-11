/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import SiteType from '../types/SiteType';
import { Site } from '../models';

const sites = {
  type: new List(SiteType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Site, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default sites;
