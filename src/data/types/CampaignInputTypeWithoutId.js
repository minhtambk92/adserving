import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../models';

const CampaignInputTypeWithoutId = new InputObjectType({
  name: 'CampaignInputTypeWithoutId',
  fields: attributeFields(Campaign, {
    only: [
      'advertiserId',
      'userId',
      'name',
      'startTime',
      'endTime',
      'views',
      'viewPerSession',
      'timeResetViewCount',
      'weight',
      'description',
    ],
  }),
});

export default CampaignInputTypeWithoutId;
