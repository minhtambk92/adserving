/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import CampaignType from '../types/CampaignType';
import { Campaign } from '../models';

const campaigns = {
  type: new List(CampaignType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Campaign, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default campaigns;
