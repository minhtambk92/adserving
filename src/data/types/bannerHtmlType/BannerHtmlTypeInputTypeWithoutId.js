import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { BannerHtmlType } from '../../models';

const BannerHtmlTypeInputTypeWithoutId = new InputObjectType({
  name: 'BannerHtmlTypeInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(BannerHtmlType, {
    only: ['name', 'value', 'weight', 'status'],
  }), {
    // Additional fields
  }),
});

export default BannerHtmlTypeInputTypeWithoutId;
