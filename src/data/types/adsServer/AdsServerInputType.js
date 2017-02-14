import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { AdsServer } from '../../models';

const AdsServerInputType = new InputObjectType({
  name: 'AdsServerInputType',
  fields: () => Object.assign(attributeFields(AdsServer, {
    // Additional options
    only: ['id', 'name', 'value', 'status', 'userId'],
  }), {
    // Additional fields
  }),
});

export default AdsServerInputType;
