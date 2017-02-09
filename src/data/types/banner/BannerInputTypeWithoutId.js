import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../../models';

const BannerInputTypeWithoutId = new InputObjectType({
  name: 'BannerInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['name', 'html', 'width', 'height', 'keyword', 'weight', 'description', 'status', 'channelId', 'imageUrl', 'bannerHtmlTypeId', 'url', 'target', 'bannerTypeId', 'channelId', 'adsServerId', 'isIFrame', 'isCountView', 'isFixIE', 'isDefault', 'isRelative', 'isImpressionsBooked', 'isClicksBooked', 'adStore', 'impressionsBooked', 'clicksBooked', 'activationDate', 'expirationDate'],
  }), {
    // Additional fields
  }),
});

export default BannerInputTypeWithoutId;
