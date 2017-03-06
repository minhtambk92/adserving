/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import MenuItemType from '../../types/menu/MenuItemType';
import { MenuItem } from '../../models';

const menuItems = {
  type: new List(MenuItemType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(MenuItem, {
    before(options, args, res) {
      const opts = options;
      opts.where = res.body.variables;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default menuItems;
