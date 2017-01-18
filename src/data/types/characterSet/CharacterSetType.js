/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { CharacterSet } from '../../models';

const CharacterSetType = new ObjectType({
  name: 'CharacterSetType',
  fields: () => Object.assign(attributeFields(CharacterSet, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default CharacterSetType;
