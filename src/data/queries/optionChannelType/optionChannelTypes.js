/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import OptionChannelTypeType from '../../types/optionChannelType/OptionChannelTypeType';
import { OptionChannelType } from '../../models';

const optionChannelTypes = {
  type: new List(OptionChannelTypeType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannelType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default optionChannelTypes;
