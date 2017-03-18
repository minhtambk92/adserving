/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ZoneSizeTypeType from '../../types/zoneSizeType/ZoneSizeTypeType';
import { ZoneSizeType } from '../../models';

const zoneSizeTypes = {
  type: new List(ZoneSizeTypeType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ZoneSizeType, {
    before(options, args, res) {
      const opts = options;
      if (res.body !== undefined) {
        opts.where = res.body.variables;
      }
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default zoneSizeTypes;
