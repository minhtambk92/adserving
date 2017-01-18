/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import CharacterSetType from '../../types/characterSet/CharacterSetType';
import { CharacterSet } from '../../models';

const characterSets = {
  type: new List(CharacterSetType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(CharacterSet, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default characterSets;
