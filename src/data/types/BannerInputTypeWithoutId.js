import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Banner } from '../models';

const BannerInputTypeWithoutId = new InputObjectType({
  name: 'BannerInputTypeWithoutId',
  fields: attributeFields(Banner, {
    only: ['userId', 'name', 'html', 'width', 'height', 'keyword', 'weight', 'description'],
  }),
});

export default BannerInputTypeWithoutId;
