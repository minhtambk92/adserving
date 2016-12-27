/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ChannelOptionCategory } from '../../models';

const ChannelOptionCategoryType = new ObjectType({
  name: 'ChannelOptionCategoryType',
  fields: () => Object.assign(attributeFields(ChannelOptionCategory, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default ChannelOptionCategoryType;
