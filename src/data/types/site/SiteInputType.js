/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../../models';

const SiteInputType = new InputObjectType({
  name: 'SiteInputType',
  fields: () => Object.assign(attributeFields(Site, {
    only: ['id', 'domain', 'name', 'email', 'description', 'status'],
  }), {
    // Additional fields
  }),
});

export default SiteInputType;
