/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { MenuItem } from '../models';
import menuItemHasManyChildItems from '../queries/menuItemHasManyChildItems';

const MenuItemType = new ObjectType({
  name: 'MenuItemType',
  fields: () => Object.assign(attributeFields(MenuItem, {
    // Additional options
  }), {
    // Additional fields
    childItems: menuItemHasManyChildItems(),
  }),
});

export default MenuItemType;
