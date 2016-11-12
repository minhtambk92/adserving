/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Menu } from '../models';

const MenuType = new ObjectType({
  name: 'MenuType',
  fields: () => Object.assign(attributeFields(Menu, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default MenuType;
