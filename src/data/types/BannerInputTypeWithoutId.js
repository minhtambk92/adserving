import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';

const BannerInputTypeWithoutId = new InputObjectType({
  name: 'BannerInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['name', 'html', 'width', 'height', 'keyword', 'weight', 'description', 'status', 'imageUrl', 'url', 'target', 'type', 'channelId', 'adServer', 'bannerHTMLType', 'userIFrame', 'countView', 'fixIE', 'isDefault', 'isRelative', 'impressionsBooked', 'clicksBooked', 'activationDate', 'expirationDate', 'adStore', 'impressionsBookedValue', 'clicksBookedValue', 'activationDateValue', 'expirationDateValue'],
  }), {
    // Additional fields
  }),
});

export default BannerInputTypeWithoutId;
