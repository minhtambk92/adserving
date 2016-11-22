/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';
import bannerHasManyPlacementBannerZones from '../queries/bannerHasManyPlacementBannerZones';
import bannerBelongsToChannel from '../queries/bannerBelongsToChannel';
import bannerHasManyClickImpressions from '../queries/bannerHasManyClickImpressions';

const BannerType = new ObjectType({
  name: 'BannerType',
  fields: () => Object.assign(attributeFields(Banner, {
    // Additional options
  }), {
    // Additional fields
    pbzBanner: bannerHasManyPlacementBannerZones(),
    channel: bannerBelongsToChannel(),
    clickImpression: bannerHasManyClickImpressions(),
  }),
});

export default BannerType;
