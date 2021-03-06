/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Filter } from '../models';

const FilterType = new ObjectType({
  name: 'FilterType',
  fields: Object.assign(attributeFields(Filter, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default FilterType;
