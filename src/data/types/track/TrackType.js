import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Track } from '../../models';
import trackBelongsToBanner from '../../queries/track/trackBelongsToBanner';

const TrackType = new ObjectType({
  name: 'TrackType',
  fields: () => Object.assign(attributeFields(Track, {
    // Additional options
  }), {
    // Additional fields
    banner: trackBelongsToBanner(),
  }),
});

export default TrackType;
