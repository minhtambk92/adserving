import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../models';

const CampaignInputType = new InputObjectType({
  name: 'CampaignInputType',
  fields: () => Object.assign(attributeFields(Campaign, {
    // Additional options
    only: [
      'id',
      'advertiserId',
      'name',
      'startTime',
      'endTime',
      'views',
      'viewPerSession',
      'timeResetViewCount',
      'weight',
      'description',
    ],
  }), {
    // Additional fields
    status: { type: StringType },
  }),
});

export default CampaignInputType;
