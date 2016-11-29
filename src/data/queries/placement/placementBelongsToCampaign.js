import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Placement } from '../../models';
import CampaignType from '../../types/campaign/CampaignType';

const placementBelongsToCampaign = () => ({
  type: CampaignType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Placement.campaign, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default placementBelongsToCampaign;
