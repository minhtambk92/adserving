/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../models';
import campaignBelongsToAdvertiser from '../queries/campaignBelongsToAdvertiser';
const CampaignType = new ObjectType({
  name: 'Campaign',
  fields: () => Object.assign(attributeFields(Campaign, {
    // Additional options
  }), {
    // Additional fields
    advertiser: campaignBelongsToAdvertiser(),
  }),
});

export default CampaignType;
