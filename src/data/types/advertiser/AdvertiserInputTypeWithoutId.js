import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Advertiser } from '../../models';

const AdvertiserInputTypeWithoutId = new InputObjectType({
  name: 'AdvertiserInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Advertiser, {
    only: ['email', 'name', 'contact', 'description', 'status'],
  }), {
    // Additional fields
  }),
});

export default AdvertiserInputTypeWithoutId;
