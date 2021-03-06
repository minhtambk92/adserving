import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../../models';

const BannerInputType = new InputObjectType({
  name: 'BannerInputType',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['id', 'name', 'html', 'width', 'height', 'keyword', 'description', 'adsServerId', 'imageUrl', 'url', 'channelId', 'bannerHtmlTypeId', 'target', 'adStore', 'impressionsBooked', 'clicksBooked', 'activationDate', 'expirationDate'],
    allowNull: true,
  }), {
    // Additional fields
    status: { type: new NonNull(StringType) },
    bannerTypeId: { type: new NonNull(StringType) },
    isIFrame: { type: new NonNull(BooleanType) },
    weight: { type: new NonNull(IntType) },
    isCountView: { type: new NonNull(BooleanType) },
    isFixIE: { type: new NonNull(BooleanType) },
    isDefault: { type: new NonNull(BooleanType) },
    isRelative: { type: new NonNull(BooleanType) },
    placements: { type: new List(StringType) },
  }),
});

export default BannerInputType;
