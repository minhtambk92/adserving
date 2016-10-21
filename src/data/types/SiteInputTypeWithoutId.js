/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../models';

const SiteInputTypeWithoutId = new InputObjectType({
  name: 'SiteInputWithoutId',
  fields: () => Object.assign(attributeFields(Site, {
    only: ['domain', 'name', 'email', 'description'],
  }), {
    // Additional fields
  }),
});

export default SiteInputTypeWithoutId;
