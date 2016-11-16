/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { MenuHeader } from '../models';

const MenuHeaderType = new ObjectType({
  name: 'MenuHeaderType',
  fields: () => Object.assign(attributeFields(MenuHeader, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default MenuHeaderType;
