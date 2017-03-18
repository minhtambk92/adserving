/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import OptionChannelValuePropertyType from '../../types/optionChannelValueProperty/OptionChannelValuePropertyType';
import { OptionChannelValueProperty } from '../../models';

const optionChannelValueProperties = {
  type: new List(OptionChannelValuePropertyType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannelValueProperty, {
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

export default optionChannelValueProperties;
