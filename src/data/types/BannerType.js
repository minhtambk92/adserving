/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';

const BannerType = new ObjectType({
  name: 'Banner',
  fields: Object.assign(attributeFields(Banner, {
    // Additional options
  }), {
    // additional fields
  }),
});

export default BannerType;
