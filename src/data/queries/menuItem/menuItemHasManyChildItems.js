/**
 * Created by Manhhailua on 10/17/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { MenuItem } from '../../models';
import MenuItemType from '../../types/menu/MenuItemType';

const menuItemHasManyChildItems = () => ({
  type: new List(MenuItemType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(MenuItem.childItems, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['order', 'ASC']);
      return opts;
    },
  }),
});

export default menuItemHasManyChildItems;
