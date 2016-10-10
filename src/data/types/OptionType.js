/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Option } from '../models';

const OptionType = new ObjectType({
  name: 'Option',
  fields: Object.assign(attributeFields(Option, {
    // Additional options
  }), {
    // additional fields
  }),
});

export default OptionType;
