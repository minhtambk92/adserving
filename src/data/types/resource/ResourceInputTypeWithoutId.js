/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Resource } from '../../models';

const ResourceInputTypeWithoutId = new InputObjectType({
  name: 'ResourceInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Resource, {
    only: [
      'uniqueName',
      'modelName',
      'name',
      'hasMeta',
      'description',
      'status',
    ],
  }), {
    // Additional fields
  }),
});

export default ResourceInputTypeWithoutId;
