/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import MenuHeaderType from '../../types/menu/MenuHeaderType';
import { MenuHeader } from '../../models';

const menuItems = {
  type: new List(MenuHeaderType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(MenuHeader, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default menuItems;
