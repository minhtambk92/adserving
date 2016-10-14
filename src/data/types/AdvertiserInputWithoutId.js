import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Advertiser } from '../models';

const AdvertiserInputTypeWithoutId = new InputObjectType({
  name: 'AdvertiserInputWithoutId',
  fields: attributeFields(Advertiser, {
    only: ['name', 'email', 'contact', 'description'],
  }),
});

export default AdvertiserInputTypeWithoutId;
