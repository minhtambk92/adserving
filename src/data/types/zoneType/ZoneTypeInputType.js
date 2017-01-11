import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ZoneType } from '../../models';

const ZoneTypeInputType = new InputObjectType({
  name: 'ZoneTypeInputType',
  fields: () => Object.assign(attributeFields(ZoneType, {
    // Additional options
    only: ['id', 'name', 'value', 'isSize', 'status'],
  }), {
    // Additional fields
  }),
});

export default ZoneTypeInputType;
