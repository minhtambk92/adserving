/**
 * Created by Manhhailua on 10/17/16.
 */

import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Zone } from '../../models';
import ZoneSizeTypeType from '../../types/zoneSizeType/ZoneSizeTypeType';

const zoneBelongsToZoneSizeType = () => ({
  type: ZoneSizeTypeType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Zone.zoneSizeType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default zoneBelongsToZoneSizeType;
