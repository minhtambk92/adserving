/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import OptionChannelValueType from '../../types/optionChannelValue/OptionChannelValueType';
import { OptionChannelValue } from '../../models';

const optionChannelValues = {
  type: new List(OptionChannelValueType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannelValue, {
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

export default optionChannelValues;
