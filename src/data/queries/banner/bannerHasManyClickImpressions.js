import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Banner } from '../models';
import ClickImpressionType from '../../types/clickImpression/ClickImpressionType';

const bannerHasManyClickImpressions = () => ({
  type: new List(ClickImpressionType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Banner.clickImpressions, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default bannerHasManyClickImpressions;
