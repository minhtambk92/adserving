import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../models';

const CampaignInputType = new InputObjectType({
  name: 'CampaignInputType',
  fields: attributeFields(Campaign, {
    only: ['id',
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
  }, {
    // Additional fields
  }),
});

export default CampaignInputType;
