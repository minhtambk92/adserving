import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { AdsServer } from '../../models';

const AdsServerInputTypeWithoutId = new InputObjectType({
  name: 'AdsServerInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(AdsServer, {
    only: ['name', 'value', 'status', 'userId'],
  }), {
    // Additional fields
  }),
});

export default AdsServerInputTypeWithoutId;
