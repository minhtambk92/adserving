/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLNonNull as NonNull,
  GraphQLInputObjectType as InputObjectType,
  GraphQLID as ID,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../models';

const SiteInputType = new InputObjectType({
  name: 'SiteInput',
  fields: () => Object.assign(attributeFields(Site, {
    // Additional options
    only: ['domain', 'name', 'email', 'description', 'status'],
    allowNull: true,
  }), {
    // Additional fields
    id: { type: new NonNull(ID) },
  }),
});

export default SiteInputType;
