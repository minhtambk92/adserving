/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import FilterType from '../types/FilterType';
import { Filter } from '../models';

const filters = {
  type: new List(FilterType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Filter, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default filters;
