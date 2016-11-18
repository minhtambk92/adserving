import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';

const BannerInputType = new InputObjectType({
  name: 'BannerInputType',
  fields: () => Object.assign(attributeFields(Banner, {
    only: ['id', 'name', 'html', 'width', 'height', 'keyword', 'weight', 'description', 'imageUrl', 'target', 'adServer', 'bannerHTMLType'],
  }), {
    // Additional fields
    status: { type: StringType },
    type: { type: StringType },
    userIFrame: { type: StringType },
  }),
});

export default BannerInputType;
