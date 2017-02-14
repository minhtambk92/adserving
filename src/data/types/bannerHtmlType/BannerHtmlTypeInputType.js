import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { BannerHtmlType } from '../../models';

const BannerHtmlTypeInputType = new InputObjectType({
  name: 'BannerHtmlTypeInputType',
  fields: () => Object.assign(attributeFields(BannerHtmlType, {
    // Additional options
    only: ['id', 'name', 'value', 'weight', 'status', 'userId'],
  }), {
    // Additional fields
  }),
});

export default BannerHtmlTypeInputType;
