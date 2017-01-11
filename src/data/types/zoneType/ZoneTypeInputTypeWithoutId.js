import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ZoneType } from '../../models';

const ZoneTypeInputTypeWithoutId = new InputObjectType({
  name: 'ZoneTypeInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(ZoneType, {
    only: ['name', 'value', 'isSize', 'status'],
  }), {
    // Additional fields
  }),
});

export default ZoneTypeInputTypeWithoutId;
