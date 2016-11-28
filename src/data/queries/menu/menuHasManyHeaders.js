/**
 * Created by Manhhailua on 10/17/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Menu } from '../../models';
import MenuHeaderType from '../../types/menu/MenuHeaderType';

const menuHasManyHeaders = () => ({
  type: new List(MenuHeaderType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Menu.headers, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['order', 'ASC']);
      return opts;
    },
  }),
});

export default menuHasManyHeaders;
