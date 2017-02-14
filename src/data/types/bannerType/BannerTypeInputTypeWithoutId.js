import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { BannerType } from '../../models';

const BannerTypeInputTypeWithoutId = new InputObjectType({
  name: 'BannerTypeInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(BannerType, {
    only: ['name', 'value', 'isUpload', 'status', 'userId'],
  }), {
    // Additional fields
  }),
});

export default BannerTypeInputTypeWithoutId;
