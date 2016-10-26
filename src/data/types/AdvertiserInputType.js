import { GraphQLInputObjectType as InputObjectType, GraphQLString as StringType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Advertiser } from '../models';

const AdvertiserInputType = new InputObjectType({
  name: 'AdvertiserInputType',
  fields: () => Object.assign(attributeFields(Advertiser, {
    // Additional options
    only: ['id', 'email', 'name', 'contact', 'description'],
  }), {
    // Additional fields
    status: { type: StringType },
  }),
});

export default AdvertiserInputType;
