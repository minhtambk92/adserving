/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { BannerType } from '../../models';
import bannerTypeHasManyBanners from '../../queries/bannerType/bannerTypeHasManyBanners';

const BannerTypeType = new ObjectType({
  name: 'BannerTypeType',
  fields: () => Object.assign(attributeFields(BannerType, {
    // Additional options
  }), {
    // Additional fields
    banner: bannerTypeHasManyBanners(),
  }),
});

export default BannerTypeType;
