import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { TypeBannerHtml } from '../../models';

const TypeBannerHtmlInputTypeWithoutId = new InputObjectType({
  name: 'TypeBannerHtmlInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(TypeBannerHtml, {
    only: ['name', 'value', 'weight', 'status'],
  }), {
    // Additional fields
  }),
});

export default TypeBannerHtmlInputTypeWithoutId;
