import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';
import bannerBelongsToChannel from '../queries/bannerBelongsToChannel';
import bannerHasManyClickImpressions from '../queries/bannerHasManyClickImpressions';
import bannerHasManyPlacements from '../queries/bannerHasManyPlacements';

const BannerType = new ObjectType({
  name: 'BannerType',
  fields: () => Object.assign(attributeFields(Banner, {
    // Additional options
  }), {
    // Additional fields
    channel: bannerBelongsToChannel(),
    clickImpression: bannerHasManyClickImpressions(),
    placements: bannerHasManyPlacements(),
  }),
});

export default BannerType;
