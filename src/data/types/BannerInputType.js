import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';

const BannerInputType = new InputObjectType({
  name: 'BannerInputType',
  fields: attributeFields(Banner, {
    only: ['id', 'userId', 'name', 'html', 'width', 'height', 'keyword', 'weight', 'description'],
  }, {
    // Additional fields
  }),
});

export default BannerInputType;
