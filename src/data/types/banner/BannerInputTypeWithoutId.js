import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../../models';

const BannerInputTypeWithoutId = new InputObjectType({
  name: 'BannerInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['name', 'html', 'width', 'height', 'keyword', 'weight', 'description', 'status', 'imageUrl', 'bannerHtmlTypeId', 'url', 'target', 'bannerTypeId', 'channelId', 'adServer', 'isIFrame', 'isCountView', 'isFixIE', 'isDefault', 'isRelative', 'isImpressionsBooked', 'isClicksBooked', 'isActivationDate', 'isExpirationDate', 'adStore', 'impressionsBooked', 'clicksBooked', 'activationDate', 'expirationDate'],
  }), {
    // Additional fields
  }),
});

export default BannerInputTypeWithoutId;
