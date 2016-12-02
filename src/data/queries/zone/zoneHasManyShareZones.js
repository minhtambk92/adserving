import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Zone } from '../../models';
import ShareZoneType from '../../types/shareZone/ShareZoneType';

const zoneHasManyShareZones = () => ({
  type: new List(ShareZoneType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Zone.shareZones, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default zoneHasManyShareZones;
