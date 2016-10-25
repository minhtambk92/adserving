/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../models';
import campaignBelongsToAdvertiser from '../queries/campaignBelongsToAdvertiser';
import campaignHasManyPlacements from '../queries/campaignHasManyPlacements';
const CampaignType = new ObjectType({
  name: 'CampaignType',
  fields: () => Object.assign(attributeFields(Campaign, {
    // Additional options
  }), {
    // Additional fields
    advertiser: campaignBelongsToAdvertiser(),
    placements: campaignHasManyPlacements(),
  }),
});

export default CampaignType;
