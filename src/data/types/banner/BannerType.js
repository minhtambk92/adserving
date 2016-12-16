import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../../models';
import bannerBelongsToChannel from '../../queries/banner/bannerBelongsToChannel';
import bannerHasManyTracks from '../../queries/banner/bannerHasManyTracks';
import bannerHasManyPlacements from '../../queries/banner/bannerHasManyPlacements';

const BannerType = new ObjectType({
  name: 'BannerType',
  fields: () => Object.assign(attributeFields(Banner, {
    // Additional options
  }), {
    // Additional fields
    channel: bannerBelongsToChannel(),
    tracks: bannerHasManyTracks(),
    placements: bannerHasManyPlacements(),
  }),
});

export default BannerType;
