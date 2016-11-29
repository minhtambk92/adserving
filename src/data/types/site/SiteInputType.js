/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../../models';

const SiteInputType = new InputObjectType({
  name: 'SiteInputType',
  fields: () => Object.assign(attributeFields(Site, {
    only: ['id', 'description'],
  }), {
    // Additional fields
    domain: { type: StringType },
    name: { type: StringType },
    email: { type: StringType },
    status: { type: StringType },
  }),
});

export default SiteInputType;
