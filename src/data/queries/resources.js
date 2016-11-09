/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ResourceType from '../types/ResourceType';
import { Resource } from '../models';

const resources = {
  type: new List(ResourceType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Resource, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default resources;
