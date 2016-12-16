
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import TrackType from '../types/track/TrackType';
import TrackInputType from '../types/track/TrackInputType';
import TrackInputTypeWithoutId from '../types/track/TrackInputTypeWithoutId';
import { Track } from '../models';

const Tracks = {
  createdTrack: {
    type: TrackType,
    args: {
      track: { type: TrackInputTypeWithoutId },
    },
    resolve: resolver(Track, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Track.create(args.track).then(track => {
          opts.where.id = { $eq: track.id };
        });
        return opts;
      },
    }),
  },
  updatedTrack: {
    type: TrackType,
    args: {
      track: { type: TrackInputType },
    },
    resolve: resolver(Track, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.track.id };
        const newTrack = Object.assign({}, args.track);
        delete newTrack.id; // Prevent update id

        await Track.update(newTrack, {
          where: {
            id: args.track.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedTrack: {
    type: TrackType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Track, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Track.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default Tracks;
