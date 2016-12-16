import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Track } from '../../models';

const TrackInputType = new InputObjectType({
  name: 'TrackInputType',
  fields: () => Object.assign(attributeFields(Track, {
    // Additional options
    only: ['id', 'clickUrl', 'impressionUrl'],
  }), {
    // Additional fields
  }),
});

export default TrackInputType;
