/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../models';

const SiteInputType = new InputObjectType({
  name: 'SiteInput',
  fields: attributeFields(Site, {
    // Additional options
    only: ['id', 'domain', 'name', 'email', 'description', 'status'],
    allowNull: false,
  }, {
    // Additional fields
  }),
});

export default SiteInputType;
