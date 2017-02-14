import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Activity } from '../../models';

const ActivityInputType = new InputObjectType({
  name: 'ActivityInputType',
  fields: () => Object.assign(attributeFields(Activity, {
    // Additional options
    only: ['id', 'action', 'subject', 'subjectId', 'other', 'userId'],
  }), {
    // Additional fields
  }),
});

export default ActivityInputType;
