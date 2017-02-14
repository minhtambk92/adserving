import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Activity } from '../../models';

const ActivityInputTypeWithoutId = new InputObjectType({
  name: 'ActivityInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Activity, {
    only: ['action', 'subject', 'subjectId', 'other', 'userId'],
  }), {
    // Additional fields
  }),
});

export default ActivityInputTypeWithoutId;
