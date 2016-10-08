/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Filter } from '../models';

const FilterType = new ObjectType({
  name: 'Filter',
  fields: Object.assign(attributeFields(Filter, {
    // additional options
  }), {
    // additional fields
  }),
});

export default FilterType;
