import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import TrackType from '../../types/track/TrackType';
import { Track } from '../../models';

const tracks = {
  type: new List(TrackType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Track, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default tracks;
