import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType, GraphQLBoolean as BooleanType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../../models';

const BannerInputType = new InputObjectType({
  name: 'BannerInputType',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['id', 'name', 'html', 'width', 'height', 'keyword', 'weight', 'description', 'imageUrl', 'url', 'target', 'adServer', 'bannerHTMLType', 'adStore', 'impressionsBooked', 'clicksBooked', 'activationDate', 'expirationDate'],
  }), {
    // Additional fields
    status: { type: StringType },
    type: { type: StringType },
    isIFrame: { type: BooleanType },
    isCountView: { type: BooleanType },
    isFixIE: { type: BooleanType },
    isDefault: { type: BooleanType },
    isRelative: { type: BooleanType },
    isImpressionsBooked: { type: BooleanType },
    isClicksBooked: { type: BooleanType },
    isActivationDate: { type: BooleanType },
    isExpirationDate: { type: BooleanType },
  }),
});

export default BannerInputType;
