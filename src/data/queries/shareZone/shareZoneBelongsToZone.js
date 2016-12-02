import { resolver, defaultListArgs } from 'graphql-sequelize';
import { ShareZone } from '../../models';
import ZoneType from '../../types/zone/ZoneType';

const shareZoneBelongsToZone = () => ({
  type: ZoneType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(ShareZone.zone, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default shareZoneBelongsToZone;
