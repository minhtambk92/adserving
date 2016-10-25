/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';
import bannerHasManyPlacementBannerZones from '../queries/bannerHasManyPlacementBannerZones';

const BannerType = new ObjectType({
  name: 'BannerType',
  fields: () => Object.assign(attributeFields(Banner, {
    // Additional options
  }), {
    // Additional fields
    pbzBanner: bannerHasManyPlacementBannerZones(),
  }),
});

export default BannerType;
