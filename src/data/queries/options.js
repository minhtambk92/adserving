/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import OptionType from '../types/OptionType';
import { Option } from '../models';

const option = {
  type: new List(OptionType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Option, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default option;
