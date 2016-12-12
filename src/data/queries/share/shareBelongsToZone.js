import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Share } from '../../models';
import ZoneType from '../../types/zone/ZoneType';

const shareBelongsToZone = () => ({
  type: ZoneType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Share.zone, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default shareBelongsToZone;
