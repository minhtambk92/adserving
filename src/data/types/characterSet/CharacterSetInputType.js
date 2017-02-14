import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { CharacterSet } from '../../models';

const CharacterSetInputType = new InputObjectType({
  name: 'CharacterSetInputType',
  fields: () => Object.assign(attributeFields(CharacterSet, {
    // Additional options
    only: ['id', 'name', 'value', 'status', 'userId'],
  }), {
    // Additional fields
  }),
});

export default CharacterSetInputType;
