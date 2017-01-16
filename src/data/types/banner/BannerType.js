import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../../models';
import bannerBelongsToChannel from '../../queries/banner/bannerBelongsToChannel';
import bannerBelongsToBannerHtmlType from '../../queries/banner/bannerBelongsToBannerHtmlType';
import bannerBelongsToBannerType from '../../queries/banner/bannerBelongsToBannerType';
import bannerBelongsToAdsServer from '../../queries/banner/bannerBelongsToAdsServer';
import bannerHasManyTracks from '../../queries/banner/bannerHasManyTracks';
import bannerBelongsToManyPlacements from '../../queries/banner/bannerBelongsToManyPlacements';

const BannerType = new ObjectType({
  name: 'BannerType',
  fields: () => Object.assign(attributeFields(Banner, {
    // Additional options
  }), {
    // Additional fields
    placements: bannerBelongsToManyPlacements(),
    channel: bannerBelongsToChannel(),
    tracks: bannerHasManyTracks(),
    bannerHtmlType: bannerBelongsToBannerHtmlType(),
    bannerType: bannerBelongsToBannerType(),
    adsServer: bannerBelongsToAdsServer(),
  }),
});

export default BannerType;
