/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Resource } from '../models';

const ResourceInputType = new InputObjectType({
  name: 'ResourceInputType',
  fields: () => Object.assign(attributeFields(Resource, {
    // Additional options
    only: [
      'uniqueName',
      'modelName',
      'name',
      'hasMeta',
      'description',
      'status',
    ],
    allowNull: true,
  }), {
    // Additional fields
    id: { type: new NonNull(ID) },
  }),
});

export default ResourceInputType;
