import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Track } from '../../models';

const TrackInputTypeWithoutId = new InputObjectType({
  name: 'TrackInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Track, {
    only: ['clickUrl', 'impressionUrl', 'bannerId'],
  }), {
    // Additional fields
  }),
});

export default TrackInputTypeWithoutId;
