/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Menu } from '../models';
import menuHasManyHeaders from '../../queries/menu/menuHasManyHeaders';
import menuHasManyItems from '../../queries/menu/menuHasManyItems';

const MenuType = new ObjectType({
  name: 'MenuType',
  fields: () => Object.assign(attributeFields(Menu, {
    // Additional options
  }), {
    // Additional fields
    headers: menuHasManyHeaders(),
    items: menuHasManyItems(),
  }),
});

export default MenuType;
