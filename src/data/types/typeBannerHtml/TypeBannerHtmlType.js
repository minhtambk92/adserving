/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { TypeBannerHtml } from '../../models';

const TypeBannerHtmlType = new ObjectType({
  name: 'TypeBannerHtmlType',
  fields: () => Object.assign(attributeFields(TypeBannerHtml, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default TypeBannerHtmlType;
