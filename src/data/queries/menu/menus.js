/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import MenuType from '../../types/menu/MenuType';
import { Menu } from '../../models';

const menus = {
  type: new List(MenuType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Menu, {
    before(options, args, res) {
      const opts = options;
      opts.where = res.body.variables;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default menus;
