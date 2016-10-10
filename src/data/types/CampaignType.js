/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Campaign } from '../models';

const CampaignType = new ObjectType({
  name: 'Campaign',
  fields: Object.assign(attributeFields(Campaign, {
    // Additional options
  }), {
    // additional fields
  }),
});

export default CampaignType;
