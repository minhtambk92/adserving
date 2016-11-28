/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Resource } from '../../models';

const ResourceType = new ObjectType({
  name: 'ResourceType',
  fields: () => Object.assign(attributeFields(Resource, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default ResourceType;
