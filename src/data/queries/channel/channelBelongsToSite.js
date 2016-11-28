/**
 * Created by Manhhailua on 10/17/16.
 */

import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Channel } from '../../models';
import SiteType from '../../types/site/SiteType';

const channelBelongsToSite = () => ({
  type: SiteType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Channel.site, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default channelBelongsToSite;
