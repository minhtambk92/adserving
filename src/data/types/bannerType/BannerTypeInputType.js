import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { BannerType } from '../../models';

const BannerTypeInputType = new InputObjectType({
  name: 'BannerTypeInputType',
  fields: () => Object.assign(attributeFields(BannerType, {
    // Additional options
    only: ['id', 'name', 'value', 'weight', 'status'],
  }), {
    // Additional fields
  }),
});

export default BannerTypeInputType;
