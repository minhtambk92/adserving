/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ZoneTypeType from '../../types/zoneType/ZoneTypeType';
import { ZoneType } from '../../models';

const zoneTypes = {
  type: new List(ZoneTypeType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ZoneType, {
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

export default zoneTypes;
