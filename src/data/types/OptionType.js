/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Option } from '../models';

const OptionType = new ObjectType({
  name: 'OptionType',
  fields: Object.assign(attributeFields(Option, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default OptionType;
