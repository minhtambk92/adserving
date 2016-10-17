
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import CampaignType from '../types/CampaignType';
import CampaignInputType from '../types/CampaignInputType';
import CampaignInputTypeWithoutId from '../types/CampaignInputTypeWithoutId';
import { Campaign } from '../models';

const campaigns = {
  createdCampaign: {
    type: CampaignType,
    args: {
      campaign: { type: CampaignInputTypeWithoutId },
    },
    resolve: resolver(Campaign, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Campaign.create(args.campaign).then(campaign => {
          opts.where.id = { $eq: campaign.id };
        });
        return opts;
      },
    }),
  },
  updatedCampaign: {
    type: CampaignType,
    args: {
      campaign: { type: CampaignInputType },
    },
    resolve: resolver(Campaign, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.campaign.id };
        await Campaign.upsert(args.campaign);
        return opts;
      },
    }),
  },
  deletedCampaign: {
    type: CampaignType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Campaign, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Campaign.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default campaigns;
