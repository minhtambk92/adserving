import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Campaign } from '../../models';
import AdvertiserType from '../../types/advertiser/AdvertiserType';

const campaignBelongsToAdvertiser = () => ({
  type: AdvertiserType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Campaign.advertiser, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default campaignBelongsToAdvertiser;
