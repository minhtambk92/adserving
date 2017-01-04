import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Advertiser } from '../../models';

const AdvertiserInputType = new InputObjectType({
  name: 'AdvertiserInputType',
  fields: () => Object.assign(attributeFields(Advertiser, {
    // Additional options
    only: ['id', 'email', 'name', 'isEmailReport', 'isEmailStatus', 'reportInterval', 'contact', 'description'],
  }), {
    // Additional fields
    status: { type: new NonNull(StringType) },
  }),
});

export default AdvertiserInputType;
