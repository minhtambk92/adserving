import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Advertiser } from '../models';

const AdvertiserInputType = new InputObjectType({
  name: 'AdvertiserInputType',
  fields: () => Object.assign(attributeFields(Advertiser, {
    only: ['id', 'email', 'name', 'contact', 'description'],
  }), {
    // Additional fields
  }),
});

export default AdvertiserInputType;
