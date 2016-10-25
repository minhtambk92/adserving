import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Advertiser } from '../models';
import CampaignType from '../types/CampaignType';

const advertiserHasManyCampaigns = () => ({
  type: new List(CampaignType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Advertiser.campaigns, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default advertiserHasManyCampaigns;
