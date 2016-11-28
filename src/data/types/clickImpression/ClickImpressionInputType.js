import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ClickImpression } from '../../models';

const ClickImpressionInputType = new InputObjectType({
  name: 'ClickImpressionInputType',
  fields: () => Object.assign(attributeFields(ClickImpression, {
    // Additional options
    only: ['id', 'clickUrl', 'impressionUrl'],
  }), {
    // Additional fields
  }),
});

export default ClickImpressionInputType;
