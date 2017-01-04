import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../../models';

const BannerInputType = new InputObjectType({
  name: 'BannerInputType',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['id', 'name', 'html', 'width', 'height', 'keyword', 'description', 'imageUrl', 'url', 'target', 'adServer', 'bannerHTMLType', 'adStore', 'impressionsBooked', 'clicksBooked', 'activationDate', 'expirationDate'],
  }), {
    // Additional fields
    status: { type: new NonNull(StringType) },
    type: { type: new NonNull(StringType) },
    isIFrame: { type: new NonNull(BooleanType) },
    weight: { type: new NonNull(IntType) },
    isCountView: { type: new NonNull(BooleanType) },
    isFixIE: { type: new NonNull(BooleanType) },
    isDefault: { type: new NonNull(BooleanType) },
    isRelative: { type: new NonNull(BooleanType) },
    isImpressionsBooked: { type: new NonNull(BooleanType) },
    isClicksBooked: { type: new NonNull(BooleanType) },
    isActivationDate: { type: new NonNull(BooleanType) },
    isExpirationDate: { type: new NonNull(BooleanType) },
  }),
});

export default BannerInputType;
