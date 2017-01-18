/**
 * Created by Quy on 11/15/2016.
 */
import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { CharacterSet } from '../../models';
import ZoneType from '../../types/zone/ZoneType';

const characterSetHasManyZones = () => ({
  type: new List(ZoneType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(CharacterSet.zones, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default characterSetHasManyZones;
