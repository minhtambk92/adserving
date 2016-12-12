import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../../models';

const CampaignInputTypeWithoutId = new InputObjectType({
  name: 'CampaignInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Campaign, {
    only: [
      'advertiserId',
      'name',
      'startTime',
      'endTime',
      'views',
      'viewPerSession',
      'timeResetViewCount',
      'weight',
      'revenueType',
      'expireValueCPM',
      'maxCPMPerDay',
      'description',
      'status',
    ],
  }), {
    // Additional fields
  }),
});

export default CampaignInputTypeWithoutId;
