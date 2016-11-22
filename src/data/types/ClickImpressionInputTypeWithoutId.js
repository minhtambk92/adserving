import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ClickImpression } from '../models';

const ClickImpressionInputTypeWithoutId = new InputObjectType({
  name: 'ClickImpressionInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(ClickImpression, {
    only: ['clickUrl', 'impressionUrl', 'bannerId'],
  }), {
    // Additional fields
  }),
});

export default ClickImpressionInputTypeWithoutId;
