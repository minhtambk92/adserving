import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { CharacterSet } from '../../models';

const CharacterSetInputTypeWithoutId = new InputObjectType({
  name: 'CharacterSetInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(CharacterSet, {
    only: ['name', 'value', 'status'],
  }), {
    // Additional fields
  }),
});

export default CharacterSetInputTypeWithoutId;
