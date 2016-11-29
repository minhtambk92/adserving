import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ClickImpression } from '../../models';
import clickImpressionBelongsToBanner from '../../queries/clickImpression/clickImpressionBelongsToBanner';

const ClickImpressionType = new ObjectType({
  name: 'ClickImpressionType',
  fields: () => Object.assign(attributeFields(ClickImpression, {
    // Additional options
  }), {
    // Additional fields
    banner: clickImpressionBelongsToBanner(),
  }),
});

export default ClickImpressionType;
