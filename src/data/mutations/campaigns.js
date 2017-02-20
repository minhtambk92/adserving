
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import CampaignType from '../types/campaign/CampaignType';
import CampaignInputType from '../types/campaign/CampaignInputType';
import CampaignInputTypeWithoutId from '../types/campaign/CampaignInputTypeWithoutId';
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
        await Campaign.create(args.campaign).then((campaign) => {
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
        const newCampaign = Object.assign({}, args.campaign);
        delete newCampaign.id; // Prevent update id

        await Campaign.update(newCampaign, {
          where: {
            id: args.campaign.id,
          },
        });

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
