/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { AdsServer } from '../../models';

const AdsServerType = new ObjectType({
  name: 'AdsServerType',
  fields: () => Object.assign(attributeFields(AdsServer, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default AdsServerType;
