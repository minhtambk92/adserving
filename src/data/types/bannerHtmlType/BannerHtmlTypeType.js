/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { BannerHtmlType } from '../../models';
import bannerHtmlTypeHasManyBanners from '../../queries/bannerHtmlType/bannerHtmlTypeHasManyBanners';

const BannerHtmlTypeType = new ObjectType({
  name: 'BannerHtmlTypeType',
  fields: () => Object.assign(attributeFields(BannerHtmlType, {
    // Additional options
  }), {
    // Additional fields
    banner: bannerHtmlTypeHasManyBanners(),
  }),
});

export default BannerHtmlTypeType;
