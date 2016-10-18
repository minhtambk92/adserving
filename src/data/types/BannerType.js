/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';
import bannerBelongsToAdvertiser from '../queries/bannerBelongsToAdvertiser';

const BannerType = new ObjectType({
  name: 'Banner',
  fields: () => Object.assign(attributeFields(Banner, {
    // Additional options
  }), {
    // Additional fields
    advertiser: bannerBelongsToAdvertiser(),
  }),
});

export default BannerType;
