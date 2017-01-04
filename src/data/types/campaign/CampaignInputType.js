import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../../models';

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
      'revenueType',
      'expireValueCPM',
      'maxCPMPerDay',
      'description',
    ],
  }), {
    // Additional fields
    status: { type: new NonNull(StringType) },
  }),
});

export default CampaignInputType;
