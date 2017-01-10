import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { TypeBannerHtml } from '../../models';

const TypeBannerHtmlInputType = new InputObjectType({
  name: 'TypeBannerHtmlInputType',
  fields: () => Object.assign(attributeFields(TypeBannerHtml, {
    // Additional options
    only: ['id', 'name', 'value', 'weight', 'status'],
  }), {
    // Additional fields
  }),
});

export default TypeBannerHtmlInputType;
