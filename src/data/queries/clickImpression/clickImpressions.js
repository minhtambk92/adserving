import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ClickImpressionType from '../../types/clickImpression/ClickImpressionType';
import { ClickImpression } from '../../models';

const clickImpressions = {
  type: new List(ClickImpressionType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ClickImpression, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default clickImpressions;
