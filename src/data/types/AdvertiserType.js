/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Advertiser } from '../models';

const AdvertiserType = new ObjectType({
  name: 'Advertiser',
  fields: Object.assign(attributeFields(Advertiser, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default AdvertiserType;
