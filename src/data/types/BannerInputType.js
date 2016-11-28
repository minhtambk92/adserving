import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';

const BannerInputType = new InputObjectType({
  name: 'BannerInputType',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['id', 'name', 'html', 'width', 'height', 'keyword', 'weight', 'description', 'imageUrl', 'url', 'target', 'adServer', 'bannerHTMLType', 'adStore', 'impressionsBooked', 'clicksBooked', 'activationDateValue', 'expirationDateValue'],
  }), {
    // Additional fields
    status: { type: StringType },
    type: { type: StringType },
    isIFrame: { type: StringType },
    isCountView: { type: StringType },
    isFixIE: { type: StringType },
    isDefault: { type: StringType },
    isRelative: { type: StringType },
    isImpressionsBooked: { type: StringType },
    isClicksBooked: { type: StringType },
    activationDate: { type: StringType },
    expirationDate: { type: StringType },
  }),
});

export default BannerInputType;
